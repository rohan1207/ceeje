import HeroSection from '../components/HeroSection';
import SecondSection from '../components/SecontSection';
import Ribbon from '../components/Ribbon';
import FashionComponent from '../components/FashionComponent';
const HomePage = () => {
  return (
    <div className="relative w-full min-h-screen">
      <HeroSection />
      <SecondSection />
      <Ribbon/>
      
    </div>
  );
};

export default HomePage;


