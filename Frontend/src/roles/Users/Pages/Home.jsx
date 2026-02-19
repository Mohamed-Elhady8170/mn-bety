import AccessoriesSection from '../Components/HomePageComponents/AccessoriesSection'
import Candels from '../Components/HomePageComponents/CandelsSection'
import CategorySection from '../Components/HomePageComponents/Categories'
import CookingSection from '../Components/HomePageComponents/CookingSection'
import DecoreSection from '../Components/HomePageComponents/DecoreSection'
import HeroSection from '../Components/HomePageComponents/Hero'
import Macrame from '../Components/HomePageComponents/MacrameSection'
import React from 'react'

export default function HomeProducts() {
    return (
        <>
            <HeroSection />
            <CategorySection />
            <CookingSection />
            <Candels />
            <Macrame />
            <DecoreSection />
            <AccessoriesSection />

        </>
    )
}
