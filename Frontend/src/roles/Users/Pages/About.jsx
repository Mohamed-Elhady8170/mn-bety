import React, { useState, useEffect } from 'react';
import rotateImg from '../../../assets/rotate-img.png';
import heroabout from '../../../assets/heroabout.jpg';
import { Sparkles, HeartHandshake, ShieldCheck, TrendingUp, Users, Quote, ArrowRight } from 'lucide-react';
import HeroAbout from '../Components/AboutPageComponents/HeroAbout';
import AboutSection from '../Components/AboutPageComponents/AboutSection';
import StatsSection from '../Components/AboutPageComponents/StatsSection';
import HowSection from '../Components/AboutPageComponents/HowSection';
import Values from '../Components/AboutPageComponents/Values';


const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const finalValue = parseInt(end.replace(/\D/g, ''));
    let start = 0;
    const increment = finalValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= finalValue) {
        setCount(finalValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}{end.replace(/[0-9]/g, '')}</span>;
};
export default function About() {
  return (
    <div className="bg-white  overflow-hidden text-right" dir="rtl">

     <HeroAbout />

      {/* --- About  --- */}
      <AboutSection />

      {/* --- Stats Section --- */}
      <StatsSection />
      {/* How */}
      <HowSection />

      {/* --- Core Values --- */}
      <Values />

    </div>
  );
}