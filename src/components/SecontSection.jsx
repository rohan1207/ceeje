import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Phone, Leaf, Package, Thermometer, Truck } from "lucide-react";

const SecondSection = () => {
  const features = [
    {
      Icon: Leaf,
      title: "Hand‑Selected Botanicals",
      subtitle:
        "Rare florals and resins sourced in micro‑batches for unrivalled purity.",
    },
    {
      Icon: Thermometer,
      title: "Cold Maceration",
      subtitle:
        "Slow‑brew extractions that preserve the most delicate aromatic notes.",
    },
    {
      Icon: Package,
      title: "Crystal Glass Vessels",
      subtitle:
        "UV‑shielded bottles engineered to protect every drop of fragrance.",
    },
    {
      Icon: Truck,
      title: "Worldwide White‑Glove Shipping",
      subtitle:
        "Temperature‑controlled delivery so your scent arrives in perfect balance.",
    },
  ];
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 50, damping: 40, restDelta: 0.001 };

  const rotate = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const smoothRotate = useSpring(rotate, springConfig);

  const yPasta = useTransform(scrollYProgress, [0, 1], [50, -100]);
  const rotatePasta = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const smoothYPasta = useSpring(yPasta, springConfig);
  const smoothRotatePasta = useSpring(rotatePasta, springConfig);

  const yChili = useTransform(scrollYProgress, [0, 1], [-50, 100]);
  const rotateChili = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const smoothYChili = useSpring(yChili, springConfig);
  const smoothRotateChili = useSpring(rotateChili, springConfig);

  return (
    <section
      ref={targetRef}
      className="relative bg-gradient-to-b from-white via-neutral-50 to-neutral-100 py-20 sm:py-24 px-4 sm:px-8 overflow-hidden min-h-screen"
    >
      {/* Background Text */}
      <motion.div
        className="absolute top-10 sm:top-4 left-0 right-0 text-center sm:text-[15vw] text-[12vw] font-extralight text-neutral-200 whitespace-nowrap z-0 leading-none select-none pointer-events-none font-playfair"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ letterSpacing: "0.12em" }}
      >
        CONFIDENCE
      </motion.div>

      {/* Main Layout Container */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto pt-20 sm:pt-28 lg:pt-32">
        {/* Left Side - Product imagery (order-2 on mobile) */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center order-2 lg:order-1 mt-12 lg:mt-0">
          {/* Bottle / campaign image */}
          <motion.div
            className="relative z-20 w-[80%] sm:w-[65%] lg:w-[70%]"
            style={{ rotate: smoothRotate }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative  overflow-hidden ">
              <img
                src="/sscenter.png"
                alt="CEEJE parfum bottle on marble"
                className="w-full h-full object-cover opacity-100 "
              />
              
            </div>
          </motion.div>
        </div>

        {/* Right Side - Text Content (order-1 on mobile) */}
        <div className="w-full lg:w-1/2 lg:pl-16 order-1 lg:order-2 text-left lg:text-left">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-900 leading-tight mb-6 z-40 font-playfair"
            >
              A softer horizon
              <br />
              <span className="font-normal italic text-neutral-700">
                bottled in every note
              </span>
            </h2>

            <p className="text-neutral-600 text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              CEEJE crafts slow‑made extrait de parfum designed for introspective
              luxury. Each composition layers airy citrus, smoked woods and
              mineral musks to create signatures that feel clean, luminous and
              quietly unforgettable.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-10">
              <button
                type="button"
                className="bg-neutral-900 text-white px-8 py-4 text-xs sm:text-sm font-semibold tracking-[0.25em] rounded-full hover:bg-neutral-950 transition-colors w-full sm:w-auto shadow-lg uppercase"
              >
                DISCOVER THE COLLECTION
              </button>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-900/5 border border-neutral-900/10 rounded-full flex items-center justify-center backdrop-blur">
                  <Phone size={20} className="text-neutral-800" />
                </div>
                <span className="text-gray-900 font-semibold text-lg leading-tight">
                  Speak with a<br />
                  scent curator
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Decorative Dishes */}
      <motion.div
        className="absolute right-[-3%] top-[10%] w-32 h-32 sm:w-48 sm:h-48 lg:w-60 lg:h-60 z-30"
        style={{ y: smoothYPasta, rotate: smoothRotatePasta }}
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <img
          src="/ssright.png"
          alt="CEEJE glass bottle detail"
          className="w-full h-full object-cover mix-blend-luminosity opacity-90"
        />
      </motion.div>

      {/* <motion.div
        className="absolute left-[-3%] sm:bottom-[25%] bottom-[15%] w-24 h-24 sm:w-40 sm:h-40 z-30"
        style={{ y: smoothYChili, rotate: smoothRotateChili }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <img
          src="/tofu1.png"
          alt="Tofu garnish"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </motion.div> */}

      {/* Features Ribbon */}
      <div className="relative z-20 mt-24 sm:mt-32 lg:mt-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/60"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-900/5 rounded-full flex items-center justify-center shadow-inner flex-shrink-0 border border-neutral-900/10">
                <feature.Icon className="text-neutral-800" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 tracking-[0.18em] uppercase text-xs sm:text-sm">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-sm mt-1">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SecondSection;
