import React from 'react';
import { useLanguage } from '@/lib/i18n.jsx';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: 'Hana Mesfin',
        text: {
            en: "TutorHub matched me with the perfect math tutor. My grades improved significantly in just a month!",
            am: "TutorHub ተስማሚ የሂሳብ አስተማሪ አገኘልኝ። ውጤቴ በአንድ ወር ውስጥ በጣም ተሻሻለ!",
            or: "TutorHub barsiisaa herregaa naaf ta'u na argamsise. Qabxiin koo ji'a tokkoon guddisee!"
        },
        role: { en: "Student, Grade 11", am: "ተማሪ፣ 11ኛ ክፍል", or: "Barataa, Kutaa 11" }
    },
    {
        name: 'Yonas Girma',
        text: {
            en: "Teaching on TutorHub has been amazing. I reach students across the country in their preferred language.",
            am: "በTutorHub ማስተማር አስደናቂ ነው። ተማሪዎችን በመላ ሀገሪቱ በቋንቋቸው አገኛለሁ።",
            or: "TutorHub irratti barsisuun ajaa'ibaa ta'eera. Barattoota biyya guutuu afaan isaaniitiin nan geessa."
        },
        role: { en: "Tutor, Physics", am: "አስተማሪ፣ ፊዚክስ", or: "Barsiisaa, Fiiziksii" }
    },
    {
        name: 'Fatuma Ahmed',
        text: {
            en: "I found an Afaan Oromo tutor for my children. They love the personalized sessions!",
            am: "ለልጆቼ የኦሮምኛ ቋንቋ አስተማሪ አገኘሁ። ግላዊ ክፍለ ጊዜዎቹን ይወዳሉ!",
            or: "Ijoollee kootiif barsiisaa Afaan Oromoo argadhe. Sagantaa dhuunfaa isaa jaalatu!"
        },
        role: { en: "Parent", am: "ወላጅ", or: "Maatii" }
    },
];

export default function Testimonials() {
    const { lang, t } = useLanguage();

    return (
        <section className="py-20 sm:py-28 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        {t('testimonials.title')}
                    </h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-6">
                    {testimonials.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 }}
                        >
                            <Card className="h-full border-border/50">
                                <CardContent className="p-6">
                                    <Quote className="w-8 h-8 text-primary/20 mb-3" />
                                    <p className="text-sm text-foreground leading-relaxed mb-4">
                                        "{item.text[lang]}"
                                    </p>
                                    <div className="flex gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                                        ))}
                                    </div>
                                    <p className="font-semibold text-foreground text-sm">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">{item.role[lang]}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}