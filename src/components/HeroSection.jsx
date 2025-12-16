import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import * as THREE from 'three';

const HeroSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseTargetRef = useRef({ x: 0.5, y: 0.5 });
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const materialRef = useRef(null);
  const meshRef = useRef(null);
  const textureRef = useRef(null);
  const isInitializedRef = useRef(false);
  const cleanupRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);

  // Magnetic cursor
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!canvasRef.current || isInitializedRef.current) return;

    // Create text texture
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 2048;
    textCanvas.height = 1024;
    const ctx = textCanvas.getContext('2d');
    
    if (!ctx) return;

    const initScene = (texture) => {
      if (isInitializedRef.current) return;
      isInitializedRef.current = true;

      // Scene setup with WebGL error handling
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        });
      } catch (error) {
        console.warn('WebGL not available, using fallback:', error);
        // Fallback: hide canvas and show static text instead
        if (canvasRef.current) {
          canvasRef.current.style.display = 'none';
        }
        return; // Exit early if WebGL fails
      }

      if (!renderer.getContext()) {
        console.warn('WebGL context could not be created');
        if (canvasRef.current) {
          canvasRef.current.style.display = 'none';
        }
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      sceneRef.current = scene;
      rendererRef.current = renderer;
      cameraRef.current = camera;

      // Water refraction shader
      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uMouseVelocity;
        uniform vec2 uResolution;
        uniform sampler2D uTextTexture;
        uniform float uHoverIntensity;
        
        varying vec2 vUv;
        
        // Noise function for organic waves
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        
        // Multi-octave noise for complex waves
        float fbm(vec2 st) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < 4; i++) {
            value += amplitude * noise(st);
            st *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }
        
        // Calculate water surface normal (for refraction)
        vec2 getWaterNormal(vec2 uv, vec2 mouse, float time, float hoverIntensity) {
          vec2 normal = vec2(0.0);
          
          // Ambient waves - always present (mild waves when still)
          vec2 ambientWave = vec2(
            fbm(uv * 2.0 + vec2(time * 0.3, time * 0.2)) - 0.5,
            fbm(uv * 2.0 + vec2(time * 0.25, time * 0.35) + 100.0) - 0.5
          ) * 0.04; // Mild ambient distortion - always active
          
          normal += ambientWave;
          
          // Interactive ripples from cursor movement
          if (hoverIntensity > 0.01) {
            vec2 toMouse = uv - mouse;
            float dist = length(toMouse);
            
            // Create multiple expanding ripple rings
            for (int i = 0; i < 3; i++) {
              float rippleTime = time - float(i) * 0.4;
              if (rippleTime > 0.0) {
                float rippleDist = dist - rippleTime * 0.6;
                float ripple = sin(rippleDist * 20.0) * exp(-rippleDist * 1.5);
                ripple *= exp(-rippleTime * 1.5); // Fade over time
                
                if (abs(rippleDist) < 0.3) {
                  vec2 rippleDir = normalize(toMouse + vec2(0.001));
                  normal += rippleDir * ripple * 0.2 * hoverIntensity;
                }
              }
            }
            
            // Main cursor ripple (stronger, closer) - creates water disturbance
            float cursorDist = dist;
            float cursorRipple = sin(cursorDist * 25.0 - time * 4.0) * 0.5 + 0.5;
            cursorRipple = pow(cursorRipple, 2.5);
            float cursorFalloff = 1.0 / (1.0 + cursorDist * 12.0);
            cursorRipple *= cursorFalloff;
            
            vec2 cursorDir = normalize(toMouse + vec2(0.001));
            normal += cursorDir * cursorRipple * 0.25 * hoverIntensity;
            
            // Velocity-based wave (directional) - like moving through water
            float velocityStrength = length(uMouseVelocity);
            if (velocityStrength > 0.01) {
              vec2 velocityDir = normalize(uMouseVelocity + vec2(0.001));
              float velocityWave = sin(dot(toMouse, velocityDir) * 18.0 - time * 3.5);
              velocityWave *= exp(-dist * 6.0);
              normal += velocityDir * velocityWave * min(velocityStrength, 2.0) * 0.15 * hoverIntensity;
            }
          }
          
          return normal;
        }
        
        void main() {
          vec2 uv = vUv;
          vec2 mouse = uMouse;
          
          // Get water surface normal (distortion)
          vec2 waterNormal = getWaterNormal(uv, mouse, uTime, uHoverIntensity);
          
          // Apply refraction - sample text texture with distortion
          // The water layer refracts the text below it
          vec2 refractedUv = uv + waterNormal * 0.12; // Refraction strength
          
          // Sample the text texture with refracted coordinates
          vec4 textColor = texture2D(uTextTexture, refractedUv);
          
          // Add caustics/highlights from water surface (light refraction)
          float caustic = 0.0;
          if (uHoverIntensity > 0.01) {
            float dist = length(uv - mouse);
            caustic = sin(dist * 35.0 - uTime * 5.0) * 0.5 + 0.5;
            caustic = pow(caustic, 3.0);
            caustic *= 1.0 / (1.0 + dist * 18.0);
            caustic *= uHoverIntensity * 0.25;
          }
          
          // Combine text with water effects
          vec3 finalColor = textColor.rgb;
          finalColor += vec3(caustic * 0.4); // Add caustic highlights
          
          // Output - text visible through water with refraction
          float alpha = textColor.a;
          alpha = min(alpha + caustic * 0.15, 1.0);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `;

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uMouseVelocity: { value: new THREE.Vector2(0, 0) },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uTextTexture: { value: texture },
          uHoverIntensity: { value: 0 },
        },
        transparent: true,
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      materialRef.current = material;
      meshRef.current = mesh;
      textureRef.current = texture;

      // Track mouse velocity for directional waves
      let lastMousePos = { x: 0.5, y: 0.5 };
      let lastTime = performance.now();

      // Animation loop
      let time = 0;
      const animate = () => {
        animationFrameRef.current = requestAnimationFrame(animate);
        const now = performance.now();
        const deltaTime = (now - lastTime) / 1000;
        lastTime = now;
        time += deltaTime;

        if (materialRef.current) {
          materialRef.current.uniforms.uTime.value = time;
          
          // Smooth mouse interpolation (magnetic effect)
          const lerpSpeed = 0.18;
          mouseRef.current.x += (mouseTargetRef.current.x - mouseRef.current.x) * lerpSpeed;
          mouseRef.current.y += (mouseTargetRef.current.y - mouseRef.current.y) * lerpSpeed;
          
          // Calculate mouse velocity for directional waves
          const mouseDeltaX = mouseRef.current.x - lastMousePos.x;
          const mouseDeltaY = mouseRef.current.y - lastMousePos.y;
          mouseVelocityRef.current.x = mouseDeltaX / Math.max(deltaTime, 0.001);
          mouseVelocityRef.current.y = mouseDeltaY / Math.max(deltaTime, 0.001);
          
          // Smooth velocity decay
          mouseVelocityRef.current.x *= 0.85;
          mouseVelocityRef.current.y *= 0.85;
          
          lastMousePos = { x: mouseRef.current.x, y: mouseRef.current.y };
          
          materialRef.current.uniforms.uMouse.value.set(
            mouseRef.current.x,
            1 - mouseRef.current.y // Flip Y
          );
          
          materialRef.current.uniforms.uMouseVelocity.value.set(
            mouseVelocityRef.current.x,
            -mouseVelocityRef.current.y
          );
          
          // Smooth hover intensity interpolation
          const targetIntensity = isHovering ? 1.0 : 0.0;
          const currentIntensity = materialRef.current.uniforms.uHoverIntensity.value;
          materialRef.current.uniforms.uHoverIntensity.value += (targetIntensity - currentIntensity) * 0.15;
        }

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        if (!rendererRef.current || !cameraRef.current) return;
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        if (materialRef.current) {
          materialRef.current.uniforms.uResolution.value.set(
            window.innerWidth,
            window.innerHeight
          );
        }
      };

      window.addEventListener('resize', handleResize);

      // Mouse move handler - always track for magnetic effect
      const handleMouseMove = (e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        mouseTargetRef.current.x = x;
        mouseTargetRef.current.y = y;

        // Update magnetic cursor
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      };

      const handleMouseEnter = () => {
        setIsHovering(true);
      };

      const handleMouseLeave = () => {
        setIsHovering(false);
        // Reset mouse to center when leaving
        mouseTargetRef.current.x = 0.5;
        mouseTargetRef.current.y = 0.5;
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
      }

      // Store cleanup function
      cleanupRef.current = () => {
        window.removeEventListener('resize', handleResize);
        if (container) {
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('mouseenter', handleMouseEnter);
          container.removeEventListener('mouseleave', handleMouseLeave);
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
        if (materialRef.current) {
          materialRef.current.dispose();
        }
        if (textureRef.current) {
          textureRef.current.dispose();
        }
        if (geometry) {
          geometry.dispose();
        }
        isInitializedRef.current = false;
      };
    };

    // Wait for font to load, then draw text and initialize
    document.fonts.ready.then(() => {
      // Clear with transparent background
      ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
      
      // Draw text
      ctx.fillStyle = 'black'; // Dark text for glass/water refraction
      ctx.font = 'bold 600px "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CEEJE', textCanvas.width / 2, textCanvas.height / 2);
      
      // Create Three.js texture from canvas
      const texture = new THREE.CanvasTexture(textCanvas);
      texture.needsUpdate = true;
      
      // Initialize scene with texture
      initScene(texture);
    });

    // Cleanup function
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [isHovering, cursorX, cursorY]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-white via-white to-neutral-100"
    >
      {/* Water Effect Canvas - This is the water layer that refracts the text */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ zIndex: 2 }}
      />

      {/* Background Text - Rendered to texture, visible through water refraction */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <h1
          className="text-[20vw] md:text-[15vw] lg:text-[12vw] font-extralight tracking-tight text-black/15 select-none"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full px-6 lg:px-12 py-32 pointer-events-none">
        {/* Main Content */}
        

        {/* Bottom Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center justify-between"
        >
          
        </motion.div>
      </div>

      {/* Magnetic Cursor Effect */}
      <motion.div
        className="fixed w-6 h-6 rounded-full border border-neutral-900/40 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: '-50%',
          y: '-50%',
          willChange: 'transform',
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </section>
  );
};

export default HeroSection;
