import React from 'react';
import { useLanguage } from '@/lib/i18n.jsx';
import { FileText, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
    { icon: FileText, key: 'step1', color: 'bg-primary/10 text-primary' },
    { icon: Users, key: 'step2', color: 'bg-accent/10 text-accent' },
    { icon: BookOpen, key: 'step3', color: 'bg-chart-3/10 text-chart-3' },
];

export default function HowItWorks() {
    const { t } = useLanguage();

    return (
        <section className="py-20 sm:py-28 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        {t('howItWorks.title')}
                    </h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="text-center group"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                                <step.icon className="w-7 h-7" />
                            </div>
                            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                                {t('common.step')} {i + 1}
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                {t(`howItWorks.${step.key}Title`)}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {t(`howItWorks.${step.key}Desc`)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}