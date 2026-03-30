import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import aboutImage from "../../assets/aboutlanding.jpg";
import confetti from 'canvas-confetti';
import { FaAsterisk } from "react-icons/fa";
import Navbar from "../Components/LandingNavbar";
import Footer from "../../roles/Users/Components/Footer";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux"; 
import { fetchLandingCategories } from "../Features/landingSlice";  

export default function LandingPage() {
  const dispatch = useDispatch();
  const typedRef = useRef(null);
  const { t } = useTranslation();
  const { categories, loading } = useSelector((state) => state.landing);

  useEffect(() => {
    dispatch(fetchLandingCategories());
  }, [dispatch]);

  const runSchoolPride = () => {
    const end = Date.now() + (1 * 1000);
    const colors = ['#ec4d18', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };
  const typedStrings = t('home.hero.typed_strings', { returnObjects: true });

  useEffect(() => {
    runSchoolPride();

    const typed = new Typed(typedRef.current, {
      strings: typedStrings,
      typeSpeed: 60,
      backSpeed: 30,
      loop: true,
      cursorChar: "",
    });

    return () => {
      typed.destroy();
    };
  }, [typedStrings]);

  return (
    <>
      <Navbar />

      {/* Hero Section ============== */}
      <section
        id="home"
        className="relative w-full min-h-150 flex items-center bg-bg-light overflow-hidden px-6 md:px-20 text-start"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, var(--color-dot) 2px, transparent 2px)`,
            backgroundSize: "30px 30px"
          }}
        />

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
          {/* Text Section */}
          <div className="space-y-6 order-2 md:order-1">
            <h5 className="text-text-subtle font-medium tracking-widest uppercase text-1xl flex items-center gap-2">
              <FaAsterisk className="text-primary animate-spin-slow text-[15px]" />
              <span>{t('home.hero.tagline')}</span>
            </h5>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-text-main">
              <span ref={typedRef} className="text-primary"></span>
            </h1>

            <p className="text-text-subtle text-lg leading-relaxed">
              {t('home.hero.description')}
            </p>

            <button className="bg-primary hover:bg-[#d35400] text-white px-8 py-3 rounded-full transition shadow-lg shadow-primary/20">
              {t('home.hero.browse_btn')}
            </button>
          </div>

          {/* Images Section */}
          <div className="hidden md:flex justify-center md:justify-end gap-6 h-112.5 order-1 md:order-2">
            <div className="animate-float w-48 md:w-64 h-full rounded-full overflow-hidden shadow-xl"
              style={{ border: '8px solid var(--color-image-border, #ffffff)' }}>
              <img
                src="https://i.pinimg.com/736x/51/83/dc/5183dc85829d8dc446a7421afa04f0e3.jpg"
                alt={t('home.categories.handmade.title')}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="hidden xl:block animate-float-delayed mt-12 w-48 md:w-64 h-full rounded-full overflow-hidden shadow-xl"
              style={{ border: '8px solid var(--color-image-border, #ffffff)' }}>
              <img
                src="https://i.pinimg.com/1200x/e9/bb/5d/e9bb5da6c8b0b37db56773600e899f97.jpg"
                alt={t('home.categories.home_food.title')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services (Categories) Section =============== */}
      <section id="categories" className="py-20 px-6 md:px-20 bg-bg-main text-start">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h5 className="text-primary font-medium tracking-widest uppercase text-1xs flex items-center gap-2">
              <FaAsterisk className="text-primary animate-spin-slow text-[15px]" />
              <span>{t('home.categories_section.label')}</span>
            </h5>
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-main mb-6">
              {t('home.categories_section.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              // هيكل تحميلي بسيط (Skeleton Loader)
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-95 rounded-3xl bg-gray-200 animate-pulse"></div>
              ))
            ) : (
              categories.slice(0, 4).map((cat) => (
                <div key={cat._id} className="relative h-95 rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
                  <img 
                    src={cat.image?.url || "https://via.placeholder.com/400"} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition duration-300"></div>
                  <div className="absolute bottom-0 right-0 left-0 p-6 text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                    {/* إذا لم يكن هناك وصف في الـ DB، يمكن استخدام نص افتراضي أو تركه فارغاً */}
                    <p className="text-sm opacity-90 leading-snug">{cat.slug}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="about" className="py-24 px-6 md:px-20 bg-bg-light text-start relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-28 items-center relative z-10">
          <div className="space-y-8">
            <div>
              <h5 className="text-text-subtle font-medium tracking-widest uppercase text-1xl flex items-center gap-2">
                <FaAsterisk className="text-primary animate-spin-slow text-[15px]" />
                <span>{t('common.about')}</span>
              </h5>
              <h2 className="text-2xl md:text-3xl font-black text-text-main leading-tight mb-6">
                {t('home.about_section.title')}
              </h2>
              <p className="text-text-subtle leading-relaxed max-w-lg">
                {t('home.about_section.description')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold text-text-main">
                  <span>{t('home.about_section.sellers_satisfaction')}</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[80%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold text-text-main">
                  <span>{t('home.about_section.buyers_satisfaction')}</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[90%] rounded-full"></div>
                </div>
              </div>
            </div>

            <button
              onClick={runSchoolPride}
              className="bg-primary text-white px-10 py-4 rounded-lg font-bold hover:bg-[#d35400] transition-all shadow-lg shadow-primary/20"
            >
              {t('home.about_section.discover_btn')}
            </button>
          </div>

          <div className="relative flex justify-center lg:justify-start">
            <div className="w-full aspect-4/3 overflow-hidden rounded-tr-[100px] rounded-br-4xl rounded-bl-[100px] rounded-tl-4xl shadow-2xl bg-white"
              style={{ border: '10px solid var(--color-image-border, #ffffff)' }}>
              <img src={aboutImage} alt={t('home.about_section.image_alt')} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Sell Now Section */}
      <section  id="sell" className="py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto relative h-72 rounded-3xl overflow-hidden flex items-center justify-center text-center">
          <img
            src="https://i.pinimg.com/736x/02/33/ba/0233ba523edd056c8fb8b3340d71de39.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            alt={t('home.sell_section.image_alt')}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 space-y-5 px-4 text-white">
            <span className="text-sm font-medium tracking-wide">{t('home.sell_section.tagline')}</span>
            <h2 className="text-3xl md:text-5xl font-bold">{t('home.sell_section.title')}</h2>
            <button className="bg-white text-primary px-10 py-3 rounded-lg font-bold transition transform hover:scale-105 hover:bg-gray-100 shadow-lg">
              {t('common.start_selling')}
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}