import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n.jsx';
import { ClipboardList, UserCheck, BookOpen, ChevronDown } from 'lucide-react';

const icons = [ClipboardList, UserCheck, BookOpen];
const colors = ['bg-primary/10 text-primary', 'bg-accent/10 text-accent', 'bg-chart-3/20 text-yellow-600 dark:text-yellow-400'];

export default function RequestSteps() {
    const { t } = useLanguage();
    const [activeStep, setActiveStep] = useState(null);

    const steps = [
        { title: t('requestSteps.step1Title'), desc: t('requestSteps.step1Desc') },
        { title: t('requestSteps.step2Title'), desc: t('requestSteps.step2Desc') },
        { title: t('requestSteps.step3Title'), desc: t('requestSteps.step3Desc') },
    ];

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-1">{t('requestSteps.title')}</h2>
            <p className="text-sm text-muted-foreground mb-4">{t('requestSteps.subtitle')}</p>
            <div className="space-y-2">
                {steps.map((step, i) => {
                    const Icon = icons[i];
                    const isOpen = activeStep === i;
                    return (
                        <motion.div
                            key={i}
                            layout
                            className="rounded-xl border border-border/60 bg-card overflow-hidden cursor-pointer"
                            onClick={() => setActiveStep(isOpen ? null : i)}
                        >
                            <div className="flex items-center gap-3 px-4 py-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colors[i]}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="font-semibold text-sm text-foreground">{step.title}</span>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-muted-foreground ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                            </div>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="px-4 pb-3 pt-0 text-sm text-muted-foreground border-t border-border/40 bg-muted/30">
                                            <p className="pt-3">{step.desc}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}