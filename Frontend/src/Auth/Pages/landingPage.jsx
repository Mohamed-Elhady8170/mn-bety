import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import aboutImage from "../../assets/aboutlanding.jpg";
import confetti from 'canvas-confetti';
import { FaAsterisk } from "react-icons/fa";
import Navbar from "../Components/LandingNavbar";
import Footer from "../../Roles/Users/Components/Footer";

const categories = [
  {
    title: "أكلات بيتية ",
    description: "وصفات منزلية بطعم مميز وجودة مضمونة",
    image: "https://i.pinimg.com/736x/82/e0/36/82e036e6857e01a627594c85b60fcb61.jpg",
  },
  {
    title: "هاند ميد ",
    description: "منتجات مصنوعة يدويًا بحب وإبداع",
    image: "https://i.pinimg.com/736x/b2/3e/fd/b23efd46bfdcebf0a435dfbc81b0a7bf.jpg",
  },
  {
    title: "إكسسوارات ",
    description: "قطع مميزة تضيف لمسة أناقة ليكي",
    image: "https://i.pinimg.com/1200x/0a/b0/ab/0ab0ab56129f7912e0e387557bdc5964.jpg",
  },
  {
    title: " تصميم",
    description: "تصميمات عصرية بخامات عالية الجودة",
    image: "https://i.pinimg.com/736x/1a/56/91/1a5691a3461d95bcd8e5ffb6a65cc137.jpg",
  }
];

export default function LandingPage() {
  const typedRef = useRef(null);
  const runSchoolPride = () => {
    const end = Date.now() + (10 * 1000);
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

  useEffect(() => {
    runSchoolPride();

    const typed = new Typed(typedRef.current, {
      strings: [
        "دعم المشاريع المنزلية ",
        "منتجات هاند ميد بجودة عالية ",
        "أكلات بيتي بطعم زمان ",
        "إبداعات بأيدي مصرية ",
        "اشتري بسهولة وادعم حلم حد تاني "
      ],
      typeSpeed: 60,
      backSpeed: 30,
      loop: true,
      cursorChar: "",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
    
      {/* Hero Section ============== */}
      <section
        dir="rtl"  id="home"
        className="relative w-full min-h-150 flex items-center bg-[#f8f9fa] overflow-hidden px-6 md:px-20 text-right"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "30px 30px" }}>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
          <div className="space-y-6 order-2 md:order-1">
            <h5 className="text-gray-500 font-medium tracking-widest uppercase text-1xl flex items-center gap-2">
              <FaAsterisk className="text-[#FF5A25] animate-spin-slow text-[15px]" />
              <span>منصة لدعم المشاريع المنزلية</span>
            </h5>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#2d3436]">
              <span ref={typedRef} className="text-[#ec4d18]"></span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
              اكتشف أفضل المنتجات المصنوعة بحب وإتقان،
              وادعم أصحاب المشاريع الصغيرة في مكان واحد.
            </p>

            <button className="bg-[#ec4d18] hover:bg-[#d35400] text-white px-8 py-3 rounded-full transition shadow-lg shadow-orange-100">
              تصفح المنتجات
            </button>
          </div>

          <div className="hidden md:flex justify-center md:justify-start gap-6 h-112.5 order-1 md:order-2">
            <div className="animate-float w-48 md:w-64 h-full rounded-full overflow-hidden border-8 border-white shadow-xl">
              <img
                src="https://i.pinimg.com/736x/51/83/dc/5183dc85829d8dc446a7421afa04f0e3.jpg"
                alt="منتج هاند ميد"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="animate-float-delayed mt-12 w-48 md:w-64 h-full rounded-full overflow-hidden border-8 border-white shadow-xl">
              <img
                src="https://i.pinimg.com/1200x/e9/bb/5d/e9bb5da6c8b0b37db56773600e899f97.jpg"
                alt="أكلات بيتية"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section=============== */}
      <section dir="rtl"  id="categories" className="py-20 px-6 md:px-20 bg-white text-right">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h5 className="text-[#FF5A25] font-medium tracking-widest uppercase text-1xs flex items-center gap-2">
              <FaAsterisk className="text-[#FF5A25] animate-spin-slow text-[15px]" />
              <span>الفئات المتاحة</span>
            </h5>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2d3436] mb-6">
              اكتشف أقسام المشاريع المنزلية
            </h2>
            <p className="text-gray-500 max-w-2xl leading-relaxed">
              نوفر لك منصة متكاملة تجمع نخبة من المشاريع المنزلية المميزة في مكان واحد، لتسهيل عملية البيع والشراء ودعم رواد الأعمال الصغار. باختيارك منتجات محلية مصنوعة بعناية
              ، تساهمين في تنمية مشروع ناشئ وتحويل الطموح إلى نجاح مستدام.  </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div key={index} className="relative h-95 rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition duration-300"></div>
                <div className="absolute bottom-0 right-0 left-0 p-6 text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">{cat.title}</h3>
                  <p className="text-sm opacity-90 leading-snug">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section dir="rtl" id="about" className="py-24 px-6 md:px-20 bg-[#f8f9fa] text-right relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-28 items-center relative z-10">
          <div className="space-y-8">
            <div>
              <h5 className="text-gray-500 font-medium tracking-widest uppercase text-1xl flex items-center gap-2">
                <FaAsterisk className="text-[#FF5A25] animate-spin-slow text-[15px]" />
                <span>  من نحن</span>
              </h5> 
              <h2 className="text-2xl md:text-3xl font-black text-[#2d3436] leading-tight mb-6">
                معًا لدعم كل مشروع منزلي <br /> وتحويل الشغف لنجاح حقيقي
              </h2>
              <p className="text-gray-500 leading-relaxed max-w-lg">
                منصتنا بتجمع أصحاب المشاريع المنزلية في مكان واحد.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold text-[#2d3436]">
                  <span>نسبة رضا البائعين</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div className="bg-[#ec4d18] h-full w-[80%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold text-[#2d3436]">
                  <span>نسبة رضا المشتري</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div className="bg-[#ec4d18] h-full w-[90%] rounded-full"></div>
                </div>
              </div>
            </div>

            <button
              onClick={runSchoolPride} // أضفت تشغيل الكونفيتي عند الضغط هنا أيضاً
              className="bg-[#ec4d18] text-white px-10 py-4 rounded-lg font-bold hover:bg-[#d35400] transition-all shadow-lg"
            >
              اكتشف المزيد
            </button>
          </div>

          <div className="relative flex justify-center lg:justify-start">
            <div className="w-full aspect-4/3 overflow-hidden rounded-tr-[100px] rounded-br-4xl rounded-bl-[100px] rounded-tl-4xl shadow-2xl bg-white border-10 border-white">
              <img src={aboutImage} alt="مشاريع منزلية" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Sell Now Section */}
      <section dir="rtl" id="sell"  className="py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto relative h-72 rounded-3xl overflow-hidden flex items-center justify-center text-center">
          <img
            src="https://i.pinimg.com/736x/02/33/ba/0233ba523edd056c8fb8b3340d71de39.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            alt="مشاريع منزلية"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 space-y-5 px-4 text-white">
            <span className="text-sm font-medium tracking-wide">فرصتك تبدأ مشروعك من بيتك</span>
            <h2 className="text-3xl md:text-5xl font-bold">اعرض منتجاتك وابدأ رحلتك الآن</h2>
            <button className="bg-white text-[#e17055] px-10 py-3 rounded-lg font-bold transition transform hover:scale-105 hover:bg-gray-100 shadow-lg">
              ابدأ البيع الآن
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}