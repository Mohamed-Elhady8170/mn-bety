import React from 'react';
import { HeartHandshake, ShieldCheck, TrendingUp } from 'lucide-react';

export default function HowSection() {
  return (
    <>
      <section className="py-32 bg-primary/5 relative overflow-hidden text-center" dir="rtl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-24 text-center">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-text-main mb-6">
                <span className="text-primary">كيف نصنع </span> التغيير؟
              </h2>
              <p className="text-xl text-text-subtle leading-relaxed">
                نحن لا نوفر مجرد منصة بيع، بل نبني جسراً يربط بين دفء البيوت وطموح أصحاب الحرف وبين محبي الأصالة.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="relative p-8 bg-bg-main rounded-[3rem] border border-primary/20 group hover:bg-primary transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute border border-amber-500 -top-6 right-1/2 translate-x-1/2 md:right-10 md:translate-x-0 w-12 h-12 bg-bg-main shadow-lg rounded-2xl flex items-center justify-center text-2xl font-black text-primary group-hover:bg-white group-hover:text-primary transition-all duration-500">
                01
              </div>
              <div className="mb-8 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center text-primary group-hover:text-white transition-colors duration-500">
                  <HeartHandshake
                    size={48}
                    className="transition-transform duration-700 ease-in-out 
                   group-hover:-translate-y-1.25 
                   group-hover:transform-[rotateY(180deg)]"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-black text-text-main mb-4 group-hover:text-white transition-colors duration-500">
                نمكن أصحاب الحرف
              </h3>
              <p className="text-text-subtle leading-relaxed text-lg group-hover:text-white/90 transition-colors duration-500">
                نوفر الأدوات التكنولوجية والتدريب اللازم لكل بائع من منزله، لنحول موهبته الفطرية إلى مشروع تجاري مستدام ومربح.
              </p>
            </div>

            <div className="relative p-8 bg-bg-main rounded-[3rem] border border-primary/20 group hover:bg-primary transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute border border-amber-500 -top-6 right-1/2 translate-x-1/2 md:right-10 md:translate-x-0 w-12 h-12 bg-bg-main shadow-lg rounded-2xl flex items-center justify-center text-2xl font-black text-primary group-hover:bg-white group-hover:text-primary transition-all duration-500">
                02
              </div>
              <div className="mb-8 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center text-primary group-hover:text-white transition-colors duration-500">
                  <ShieldCheck
                    size={48}
                    className="transition-transform duration-700 ease-in-out 
               group-hover:-translate-y-1.25 
               group-hover:transform-[rotateY(180deg)]"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-black text-text-main mb-4 group-hover:text-white transition-colors">نضمن أعلى المعايير</h3>
              <p className="text-text-subtle leading-relaxed text-lg group-hover:text-white/80 transition-colors">
                نحن جسر الثقة؛ نراجع ونتابع كل منتج يدوي أو منزلي لنضمن للعميل تجربة شراء تتسم بالأمان، النظافة، والجودة الفائقة.
              </p>
            </div>

            <div className="relative p-8 bg-bg-main rounded-[3rem] border border-primary/20 group hover:bg-primary transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute border border-amber-500 -top-6 right-1/2 translate-x-1/2 md:right-10 md:translate-x-0 w-12 h-12 bg-bg-main shadow-lg rounded-2xl flex items-center justify-center text-2xl font-black text-primary group-hover:bg-white group-hover:text-primary transition-all duration-500">
               03
              </div>
              <div className="mb-8 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center text-primary group-hover:text-white transition-colors duration-500">
                  <TrendingUp
                    size={48}
                    className="transition-transform duration-900 ease-in-out 
               group-hover:-translate-y-1.25 
               group-hover:transform-[rotateY(180deg)]"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-black text-text-main mb-4 group-hover:text-white transition-colors">نطمح للعالمية</h3>
              <p className="text-text-subtle leading-relaxed text-lg group-hover:text-white/80 transition-colors">
                رؤيتنا أن نكون المنصة الأولى في الشرق الأوسط التي تجعل "صنع في المنزل" فخراً يغزو الأسواق العالمية ويدعم اقتصادنا المحلي.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}