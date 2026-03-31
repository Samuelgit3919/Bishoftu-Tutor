import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import FeaturedTutors from '@/components/landing/FeaturedTutors';
import Testimonials from '@/components/landing/Testimonials';
import ReadyToTeach from '@/components/landing/ReadyToTeach';
import FAQ from '@/components/landing/FAQ';

export default function Landing() {
    return (
        <div>
            <HeroSection />
            <HowItWorks />
            <FeaturedTutors />
            <Testimonials />
            <ReadyToTeach />
            <FAQ />
        </div>
    );
}