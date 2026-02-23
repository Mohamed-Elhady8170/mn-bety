import React, { useState, useEffect } from 'react';

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

export default function StatsSection() {
  return (
    <>
    <section className="py-10 bg-primary/5 relative overflow-hidden border-y border-primary/10">
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(var(--color-primary) 4px, transparent 2px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {[
              { label: 'حرفي ومبدع', value: '15+' },
              { label: 'منتج يدوي', value: '500+' },
              { label: 'عميل سعيد', value: '12k+' },
            ].map((stat, i) => (
              <div key={i} className="relative group text-center px-4 py-8">
                <div className="absolute inset-0 scale-75 opacity-0 bg-primary/5 rounded-[3rem] transition-all duration-700 -z-10 group-hover:scale-100 group-hover:opacity-100"></div>
                
                <div className="mb-3 inline-block relative">
                  <div className="w-12 h-1 bg-primary/20 mx-auto rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-primary group-hover:w-full transition-all duration-700"></div>
                  </div>
                </div>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-main mb-4 group-hover:text-primary transition-colors tabular-nums tracking-tighter">
                  <Counter end={stat.value} />
                </h3>

                <p className="text-text-subtle font-black text-xl md:text-2xl opacity-70 group-hover:opacity-100 transition-all duration-300">
                  {stat.label}
                </p>

                <div className="mt-4 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="w-1 h-1 rounded-full bg-primary"></span>
                  <span className="w-4 h-1 rounded-full bg-primary"></span>
                  <span className="w-1 h-1 rounded-full bg-primary"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}