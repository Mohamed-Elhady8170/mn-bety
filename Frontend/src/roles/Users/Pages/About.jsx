import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, TrendingUp, Users, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white font-cairo overflow-hidden text-right" dir="rtl">
      
      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 bg-[#f8f9fa] px-4 md:px-20 overflow-hidden text-right">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#ec4d18 2px, transparent 2px)", backgroundSize: "30px 30px" }}>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <h5 className="text-[#ec4d18] font-medium tracking-widest uppercase text-sm flex items-center gap-2">
              <Sparkles className="animate-pulse" size={16} />
              <span>قصتنا تبدأ من هنا</span>
            </h5>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-900">
              أكثر من مجرد متجر.. <br/> نحن <span className="text-[#ec4d18]">عائلة حرفية</span>
            </h1>
            
            <p className="text-[#956b50] text-lg leading-relaxed max-w-lg">
              بدأنا "من بيتي" بحلم بسيط: إيجاد مساحة آمنة وموثوقة تجمع أصحاب المواهب اليدوية والأكلات المنزلية مع عشاق الجودة والأصالة. نحن نؤمن بأن كل منتج يصنع في المنزل يحمل قصة وشغفاً يستحق أن يروى.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="/user/products" className="bg-[#ec4d18] hover:bg-[#d43d0a] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-[#ec4d18]/20 flex items-center gap-2">
                تصفح المنتجات
              </a>
              <a href="/auth/signup" className="bg-white border-2 border-[#ec4d18] text-[#ec4d18] hover:bg-[#ec4d18] hover:text-white px-8 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2">
                انضم كبائع
              </a>
            </div>
          </div>

          {/* Hero Images Grid */}
          <div className="relative h-[400px] sm:h-[500px] w-full hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop" 
              alt="Crafting" 
              className="absolute top-0 right-0 w-2/3 h-2/3 object-cover rounded-3xl border-8 border-[#f8f9fa] shadow-xl z-10 animate-float"
            />
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop" 
              alt="Cooking" 
              className="absolute bottom-0 left-0 w-2/3 h-2/3 object-cover rounded-3xl border-8 border-[#f8f9fa] shadow-xl z-20 animate-float-delayed"
            />
            
            {/* Decorative Element */}
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#ec4d18]/10 rounded-full animate-ping-slow -z-10"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#ec4d18] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-x-reverse divide-white/20">
            <div className="space-y-2">
              <h3 className="text-4xl font-black">150+</h3>
              <p className="text-white/80 font-medium">حرفي وبائع</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-black">5000+</h3>
              <p className="text-white/80 font-medium">منتج فريد</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-black">12k+</h3>
              <p className="text-white/80 font-medium">عميل سعيد</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-black">24/7</h3>
              <p className="text-white/80 font-medium">دعم فني</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission */}
          <div className="bg-[#FFF7ED] rounded-3xl p-10 border border-[#FFEDD5] hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-[#ec4d18] rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#ec4d18]/30">
              <HeartHandshake size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">رسالتنا</h2>
            <p className="text-[#956b50] leading-relaxed text-lg">
              تمكين أصحاب الحرف والمشاريع المنزلية من خلال توفير منصة تكنولوجية متطورة وسهلة الاستخدام، تساعدهم على تسويق منتجاتهم، الوصول لعملاء جدد، وتحويل شغفهم إلى مصدر دخل مستدام يعزز استقلالهم المادي.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-[#F8FAFC] rounded-3xl p-10 border border-[#E2E8F0] hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-slate-800/30">
              <TrendingUp size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">رؤيتنا</h2>
            <p className="text-[#956b50] leading-relaxed text-lg">
              أن نصبح الوجهة الأولى والأكثر ثقة للتسوق الإلكتروني للمنتجات المنزلية والمصنوعات اليدوية في الشرق الأوسط، والمحرك الأساسي لنمو الاقتصاد الميكروي (Micro-economy) في مجتمعاتنا العربية.
            </p>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#f8f9fa] px-4 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-16 relative inline-block">
            قيمنا الأساسية
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#ec4d18] rounded-full"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Value 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#ec4d18] shadow-md border border-[#e7d5cf]">
                <ShieldCheck size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">الجودة والثقة</h3>
              <p className="text-[#956b50] leading-relaxed">
                نراجع كافة البائعين ومنتجاتهم لضمان حصولك على أعلى معايير الجودة والنظافة في كل طلب.
              </p>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#ec4d18] shadow-md border border-[#e7d5cf]">
                <Users size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">المجتمع أولاً</h3>
              <p className="text-[#956b50] leading-relaxed">
                نجاح البائعين هو نجاحنا. نوفر لهم الدعم الفني، التسويقي، والتدريب اللازم لتطوير أعمالهم.
              </p>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#ec4d18] shadow-md border border-[#e7d5cf]">
                <Sparkles size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">الأصالة والإبداع</h3>
              <p className="text-[#956b50] leading-relaxed">
                نحتفي بالهوية العربية وبالقطع الفريدة التي لا يمكن إيجادها في المصانع الكبرى.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}