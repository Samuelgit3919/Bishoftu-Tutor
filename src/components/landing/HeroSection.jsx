import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n.jsx';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
    const { t } = useLanguage();

    return (
        <section className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent/10 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-6">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs font-semibold text-primary">TutorHub Marketplace</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
                            {t('hero.title')}
                        </h1>
                        <p className="mt-5 text-lg text-muted-foreground max-w-lg leading-relaxed">
                            {t('hero.subtitle')}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link to="/request-tutor">
                                <Button size="lg" className="gap-2 rounded-xl px-6 shadow-lg shadow-primary/25">
                                    {t('hero.requestBtn')}
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Link to="/become-tutor">
                                <Button size="lg" variant="outline" className="gap-2 rounded-xl px-6">
                                    {t('hero.becomeBtn')}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden lg:block"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
                            <img
                                src="https://media.base44.com/images/public/69c7840dbd33d5309cbe2c2d/182e0b5c1_generated_7a1ddeba.png"
                                alt="Students and tutors in a learning environment"
                                className="relative rounded-2xl shadow-2xl w-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}