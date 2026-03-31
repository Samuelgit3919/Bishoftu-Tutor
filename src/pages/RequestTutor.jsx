import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n.jsx';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RequestSteps from '@/components/RequestSteps';

export default function RequestTutor() {
    const { t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        full_name: '', phone: '', email: '', subject: '',
        level: '', schedule: '', budget: '', location: '',
        preferred_language: 'en', status: 'pending'
    });

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await base44.entities.TutorRequest.create(form);
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
                            <h2 className="text-2xl font-bold text-foreground mb-3">{t('requestForm.success')}</h2>
                            <p className="text-muted-foreground">{t('requestForm.successMsg')}</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <RequestSteps />
                            <Card className="border-border/50 shadow-xl">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-2xl">{t('requestForm.title')}</CardTitle>
                                    <CardDescription>{t('requestForm.subtitle')}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label>{t('requestForm.fullName')} *</Label>
                                                <Input
                                                    required
                                                    value={form.full_name}
                                                    onChange={e => handleChange('full_name', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>{t('requestForm.phone')} *</Label>
                                                <Input
                                                    required
                                                    value={form.phone}
                                                    onChange={e => handleChange('phone', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label>{t('requestForm.email')}</Label>
                                            <Input
                                                type="email"
                                                value={form.email}
                                                onChange={e => handleChange('email', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label>{t('requestForm.subject')} *</Label>
                                                <Input
                                                    required
                                                    value={form.subject}
                                                    onChange={e => handleChange('subject', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>{t('requestForm.level')} *</Label>
                                                <Input
                                                    required
                                                    value={form.level}
                                                    onChange={e => handleChange('level', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label>{t('requestForm.schedule')}</Label>
                                                <Input
                                                    value={form.schedule}
                                                    onChange={e => handleChange('schedule', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>{t('requestForm.budget')}</Label>
                                                <Input
                                                    value={form.budget}
                                                    onChange={e => handleChange('budget', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label>{t('requestForm.location')}</Label>
                                            <Input
                                                value={form.location}
                                                onChange={e => handleChange('location', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label>{t('requestForm.preferredLang')}</Label>
                                            <Select value={form.preferred_language} onValueChange={v => handleChange('preferred_language', v)}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="en">English</SelectItem>
                                                    <SelectItem value="am">አማርኛ (Amharic)</SelectItem>
                                                    <SelectItem value="or">Afaan Oromo</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full gap-2 rounded-xl h-11"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>{t('requestForm.submitting')}</>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    {t('requestForm.submit')}
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