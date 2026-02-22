import HeroAbout from '../Components/AboutPageComponents/HeroAbout';
import AboutSection from '../Components/AboutPageComponents/AboutSection';
import StatsSection from '../Components/AboutPageComponents/StatsSection';
import HowSection from '../Components/AboutPageComponents/HowSection';
import Values from '../Components/AboutPageComponents/Values';

export default function About() {
  return (
    <>
      <HeroAbout />
      <AboutSection />
      <StatsSection />
      <HowSection />
      <Values />
    </>
  );
}