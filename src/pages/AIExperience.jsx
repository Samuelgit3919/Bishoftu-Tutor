import React from 'react';
import { useLanguage } from '@/lib/i18n.jsx';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, MessageSquare, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    { icon: Brain, key: 'feature1', color: 'bg-primary/10 text-primary' },
    { icon: MessageSquare, key: 'feature2', color: 'bg-accent/10 text-accent' },
    { icon: Languages, key: 'feature3', color: 'bg-chart-3/10 text-chart-3' },
];

export default function AIExperience() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen py-12 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        {t('ai.title')}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('ai.subtitle')}
                    </p>
                </motion.div>

                {/* AI Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-16"
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                        <img
                            src="https://media.base44.com/images/public/69c7840dbd33d5309cbe2c2d/87129c507_generated_0b2ed201.png"
                            alt="AI-powered education"
                            className="w-full h-64 sm:h-96 object-cover"
                        />
                        <div className="absolute bottom-6 left-6 right-6 z-20">
                            <p className="text-foreground font-semibold text-lg sm:text-xl">
                                {t('ai.title')}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Feature Cards */}
                <div className="grid sm:grid-cols-3 gap-6">
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 }}
                        >
                            <Card className="h-full border-border/50 hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className={`w-12 h-12 rounded-xl ${feat.color} flex items-center justify-center mb-4`}>
                                        <feat.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-semibold text-foreground text-lg mb-2">
                                        {t(`ai.${feat.key}`)}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {t(`ai.${feat.key}Desc`)}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}