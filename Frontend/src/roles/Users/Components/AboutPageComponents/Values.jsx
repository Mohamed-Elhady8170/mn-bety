import React from 'react';
import { Sparkles, ShieldCheck, Users } from 'lucide-react';

export default function Values() {
  return (
    <>
    <section className="py-30 bg-primary/5 px-4 md:px-20 relative overflow-hidden text-right" dir="rtl">
        <div className="max-w-7xl mx-auto relative z-10">

          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-text-main">قيمنا الأساسية</h2>
            <div className="w-24 h-2 bg-primary mt-6 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group relative p-10 rounded-[3rem] transition-all duration-500 bg-bg-main border border-primary/20 hover:border-primary hover:shadow-[0_30px_60px_-15px_rgba(236,77,24,0.1)] flex flex-col items-center text-center space-y-8">
              <div className="relative">
                <div className="text-primary w-24 h-24 flex items-center justify-center">
                  <ShieldCheck size={48} className='transition-all duration-700 ease-in-out group-hover:rotate-359' />
                </div>
                <div className="absolute -z-10 inset-0 bg-primary/10 rounded-2xl blur-lg scale-0 group-hover:scale-150 transition-transform duration-700"></div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-text-main group-hover:text-primary transition-colors duration-300">جودة مضمونة</h3>
                <p className="text-text-subtle leading-relaxed text-lg max-w-xs mx-auto">كل منتج يمر بعملية فحص دقيقة لضمان مطابقته لمعايير النظافة والإتقان.</p>
              </div>
              <div className="absolute bottom-8 w-12 h-1 bg-primary/20 rounded-full group-hover:w-24 group-hover:bg-primary transition-all duration-500"></div>
            </div>

            <div className="group relative p-10 rounded-[3rem] transition-all duration-500 bg-bg-main border border-primary/20 hover:border-primary hover:shadow-[0_30px_60px_-15px_rgba(236,77,24,0.1)] flex flex-col items-center text-center space-y-8">
              <div className="relative">
                <div className="text-primary w-24 h-24 flex items-center justify-center">
                  <Users size={48} className='transition-all duration-700 ease-in-out group-hover:rotate-359' />
                </div>
                <div className="absolute -z-10 inset-0 bg-primary/10 rounded-2xl blur-lg scale-0 group-hover:scale-150 transition-transform duration-700"></div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-text-main group-hover:text-primary transition-colors duration-300">المجتمع أولاً</h3>
                <p className="text-text-subtle leading-relaxed text-lg max-w-xs mx-auto">بشرائك من هنا، أنت تدعم بشكل مباشر عائلات حرفية ومشاريع صغيرة طموحة.</p>
              </div>
              <div className="absolute bottom-8 w-12 h-1 bg-primary/20 rounded-full group-hover:w-24 group-hover:bg-primary transition-all duration-500"></div>
            </div>

            <div className="group relative p-10 rounded-[3rem] transition-all duration-500 bg-bg-main border border-primary/20 hover:border-primary hover:shadow-[0_30px_60px_-15px_rgba(236,77,24,0.1)] flex flex-col items-center text-center space-y-8">
              <div className="relative">
                <div className="text-primary w-24 h-24 flex items-center justify-center">
                  <Sparkles size={48} className='transition-all duration-700 ease-in-out group-hover:rotate-359' />
                </div>
                <div className="absolute -z-10 inset-0 bg-primary/10 rounded-2xl blur-lg scale-0 group-hover:scale-150 transition-transform duration-700"></div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-text-main group-hover:text-primary transition-colors duration-300">أصالة وإبداع</h3>
                <p className="text-text-subtle leading-relaxed text-lg max-w-xs mx-auto">قطع مصنوعة يدوياً بحب، لا يمكنك العثور على مثيل لها في الأسواق التجارية.</p>
              </div>
              <div className="absolute bottom-8 w-12 h-1 bg-primary/20 rounded-full group-hover:w-24 group-hover:bg-primary transition-all duration-500"></div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}