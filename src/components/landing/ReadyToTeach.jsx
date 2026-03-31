import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n.jsx';

export default function ReadyToTeach() {
    const { t } = useLanguage();

    return (
        <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid sm:grid-cols-2 gap-6">

                    {/* Tutor CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-2xl bg-primary p-8 sm:p-10 text-primary-foreground overflow-hidden"
                    >
                        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white/5" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{t('readyToTeach.tutorTitle')}</h3>
                            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
                                {t('readyToTeach.tutorDesc')}
                            </p>
                            <ul className="space-y-2 mb-7 text-sm text-primary-foreground/90">
                                <li className="flex items-center gap-2">✓ {t('readyToTeach.tutorBullet1')}</li>
                                <li className="flex items-center gap-2">✓ {t('readyToTeach.tutorBullet2')}</li>
                                <li className="flex items-center gap-2">✓ {t('readyToTeach.tutorBullet3')}</li>
                            </ul>
                            <Button asChild variant="secondary" className="gap-2 rounded-xl font-semibold">
                                <Link to="/become-tutor">
                                    {t('readyToTeach.tutorBtn')} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Student CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative rounded-2xl bg-accent p-8 sm:p-10 text-accent-foreground overflow-hidden"
                    >
                        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white/5" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{t('readyToTeach.studentTitle')}</h3>
                            <p className="text-accent-foreground/80 text-sm leading-relaxed mb-6">
                                {t('readyToTeach.studentDesc')}
                            </p>
                            <ul className="space-y-2 mb-7 text-sm text-accent-foreground/90">
                                <li className="flex items-center gap-2">✓ {t('readyToTeach.studentBullet1')}</li>
                                <li className="flex items-center gap-2">✓ {t('readyToTeach.studentBullet2')}</li>
                                <li className="flex items-center gap-2">✓ {t('readyToTeach.studentBullet3')}</li>
                            </ul>
                            <Button asChild variant="secondary" className="gap-2 rounded-xl font-semibold">
                                <Link to="/request-tutor">
                                    {t('readyToTeach.studentBtn')} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}