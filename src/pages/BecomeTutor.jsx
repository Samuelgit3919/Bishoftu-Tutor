import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n.jsx';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BecomeSteps from '@/components/BecomeSteps';

export default function BecomeTutor() {
    const { t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        full_name: '', phone: '', email: '', subjects: '',
        experience: '', availability: '', languages: '', bio: '',
        status: 'pending'
    });

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await base44.entities.TutorApplication.create(form);
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen py-12 sm:py-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-3">{t('becomeForm.success')}</h2>
                            <p className="text-muted-foreground">{t('becomeForm.successMsg')}</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <BecomeSteps />
                            <Card className="border-border/50 shadow-xl">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-2xl">{t('becomeForm.title')}</CardTitle>
                                    <CardDescription>{t('becomeForm.subtitle')}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label>{t('becomeForm.fullName')} *</Label>
                                                <Input
                                                    required
                                                    value={form.full_name}
                                                    onChange={e => handleChange('full_name', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>{t('becomeForm.phone')} *</Label>
                                                <Input
                                                    required
                                                    value={form.phone}
                                                    onChange={e => handleChange('phone', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label>{t('becomeForm.email')}</Label>
                                            <Input
                                                type="email"
                                                value={form.email}
                                                onChange={e => handleChange('email', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label>{t('becomeForm.subjects')} *</Label>
                                            <Input
                                                required
                                                placeholder="e.g. Mathematics, Physics, Chemistry"
                                                value={form.subjects}
                                                onChange={e => handleChange('subjects', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label>{t('becomeForm.experience')}</Label>
                                                <Input
                                                    value={form.experience}
                                                    onChange={e => handleChange('experience', e.target.value)}
                                                    placeholder="e.g. 3 years"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>{t('becomeForm.availability')}</Label>
                                                <Input
                                                    value={form.availability}
                                                    onChange={e => handleChange('availability', e.target.value)}
                                                    placeholder="e.g. Weekday evenings"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label>{t('becomeForm.languages')}</Label>
                                            <Input
                                                value={form.languages}
                                                onChange={e => handleChange('languages', e.target.value)}
                                                placeholder="e.g. English, Amharic"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label>{t('becomeForm.bio')}</Label>
                                            <Textarea
                                                value={form.bio}
                                                onChange={e => handleChange('bio', e.target.value)}
                                                rows={3}
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full gap-2 rounded-xl h-11"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>{t('becomeForm.submitting')}</>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    {t('becomeForm.submit')}
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}