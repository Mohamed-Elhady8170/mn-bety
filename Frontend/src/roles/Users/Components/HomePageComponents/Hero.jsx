import React, { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
    const slides = [
        "https://i.pinimg.com/1200x/39/38/87/393887a1e8c6019b0a0c7d51ff100307.jpg",
        "https://i.pinimg.com/1200x/bc/86/a1/bc86a1f359e06972863e331288c72899.jpg",
        "https://i.pinimg.com/736x/74/72/a5/7472a580d5e42927f9a24823815c46e7.jpg",
        "https://i.pinimg.com/1200x/3a/07/65/3a07651fc6f4ca2abc2eb6274007b71c.jpg"
    ];

    const infiniteSlides = [...slides, slides[0]];
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 3000);
        return () => clearInterval(timer);
    }, [currentSlide]);

    const handleNext = () => {
        setIsTransitioning(true);
        setCurrentSlide((prev) => prev + 1);
    };

    const handleTransitionEnd = () => {
        if (currentSlide === infiniteSlides.length - 1) {
            setIsTransitioning(false); 
            setCurrentSlide(0); 
        }
    };

    return (
        <div className="container mx-auto px-4 lg:px-10 py-8" dir="ltr">
            <div className="flex flex-col lg:flex-row gap-4 lg:h-[500px] items-stretch">
                
                <div className="w-full lg:w-1/3 h-[300px] lg:h-full">
                    <img
                        src="https://i.pinimg.com/736x/6a/f1/45/6af14548276ab98b27064f65b087925b.jpg"
                        alt="side banner"
                        className="w-full h-full object-cover rounded-2xl shadow-md"
                    />
                </div>

                <div className="w-full lg:w-2/3 h-[300px] lg:h-full relative overflow-hidden rounded-2xl shadow-md group">
                    <div
                        className={`flex h-full ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {infiniteSlides.map((src, index) => (
                            <div key={index} className="min-w-full h-full">
                                <img
                                    src={src}
                                    alt={`Slide ${index}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setIsTransitioning(true);
                                    setCurrentSlide(index);
                                }}
                                className={`h-2.5 transition-all duration-300 rounded-full ${
                                    (currentSlide % slides.length) === index ? "w-8 bg-white" : "w-2.5 bg-white/40"
                                }`}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroSection;