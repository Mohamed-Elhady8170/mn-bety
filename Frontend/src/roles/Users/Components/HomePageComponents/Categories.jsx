import React from 'react';

const CategorySection = () => {
    const categories = [
        { name: "أكلات بيتي", img: "https://i.pinimg.com/736x/36/7d/a4/367da47f984feee716615334a080a638.jpg" },
        { name: "الشموع", img: "https://i.pinimg.com/1200x/db/f1/12/dbf112bfd131f50fb64e1058183350d7.jpg" },
        { name: "المكرميات", img: "https://i.pinimg.com/736x/ec/06/26/ec06265519d7f3c9e577772f9d60df9a.jpg" },
        { name: "ديكور منزلي", img: "https://i.pinimg.com/736x/3a/87/9f/3a879fcadb6113c46887b09b81ecf078.jpg" },
        { name: "الإكسسوارات", img: "https://i.pinimg.com/1200x/72/34/0a/72340ae3fb936643f8a8d9b60bca17af.jpg" },

    ];

    return (
        <section className="bg-[#f8f9fa] py-20" dir="rtl">
            <div className="container mx-auto px-4">

                <div className="flex flex-wrap justify-center gap-[25px]">
                    {categories.map((cat, index) => (
                        <a
                            key={index}
                            href="#"
                            className="group relative overflow-hidden
                w-[180px] h-[180px] border-2 border-[#e9ecef]
                flex flex-col items-center justify-center transition-all duration-500 ease-in-out
                rounded-[100%_60%_60%_100%/_100%_100%_60%_60%]
                hover:rounded-full hover:shadow-xl"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${cat.img})` }}
                            ></div>

                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500"></div>

                            <h6 className="relative z-10 text-white text-lg font-bold px-[10px] text-center leading-[1.3] w-full truncate drop-shadow-md">
                                {cat.name}
                            </h6>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CategorySection;