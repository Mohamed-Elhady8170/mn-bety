import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const CategorySection = () => {
    const categories = [
        { name: "أكلات بيتي", img: "https://i.pinimg.com/736x/36/7d/a4/367da47f984feee716615334a080a638.jpg" },
        { name: "الشموع", img: "https://i.pinimg.com/1200x/db/f1/12/dbf112bfd131f50fb64e1058183350d7.jpg" },
        { name: "المكرميات", img: "https://i.pinimg.com/736x/ec/06/26/ec06265519d7f3c9e577772f9d60df9a.jpg" },
        { name: "ديكور منزلي", img: "https://i.pinimg.com/736x/3a/87/9f/3a879fcadb6113c46887b09b81ecf078.jpg" },
        { name: "الإكسسوارات", img: "https://i.pinimg.com/1200x/72/34/0a/72340ae3fb936643f8a8d9b60bca17af.jpg" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [slidesPerView, setSlidesPerView] = useState(5);

    // Update slides per view based on screen size
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setSlidesPerView(2);
            } else if (width < 768) {
                setSlidesPerView(3);
            } else if (width < 1024) {
                setSlidesPerView(4);
            } else {
                setSlidesPerView(5);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % categories.length);
    };

    useEffect(() => {
        if (slidesPerView === 5) return;

        const timer = setInterval(() => {
            handleNext();
        }, 3000);

        return () => clearInterval(timer);
    }, [currentIndex, slidesPerView]);

    // Get visible items
    const getVisibleItems = () => {
        const items = [];
        for (let i = 0; i < slidesPerView; i++) {
            const index = (currentIndex + i) % categories.length;
            items.push(categories[index]);
        }
        return items;
    };

    // Variants for animation
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <section className="bg-bg-light py-20" dir="rtl">
            <div className="container mx-auto px-4">
                {/* Carousel Container */}
                <div className="relative overflow-hidden">
                    <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.4 }
                            }}
                            className="flex justify-center gap-4 md:gap-6.25"
                        >
                            {getVisibleItems().map((cat, idx) => (
                                <a
                                    key={`${currentIndex}-${idx}`}
                                    href="#"
                                    className="group relative overflow-hidden
                                        w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48
                                        border-2 border-border-main
                                        flex flex-col items-center justify-center transition-all duration-500 ease-in-out
                                        rounded-[100%_60%_60%_100%/_100%_100%_60%_60%]
                                        hover:rounded-full hover:shadow-xl"
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${cat.img})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500"></div>
                                    <h6 className="relative z-10 text-white text-sm sm:text-base md:text-lg font-bold px-2 text-center leading-[1.3] w-full truncate drop-shadow-md">
                                        {cat.name}
                                    </h6>
                                </a>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;