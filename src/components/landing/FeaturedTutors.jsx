import React from 'react';
import { useLanguage } from '@/lib/i18n.jsx';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const defaultTutors = [
    {
        id: 'demo1',
        name: 'Amina Tadesse',
        subjects: 'Mathematics, Physics',
        experience: '5',
        languages: 'English, Amharic',
        photo_url: 'https://media.base44.com/images/public/69c7840dbd33d5309cbe2c2d/a1d27c987_generated_45695058.png',
    },
    {
        id: 'demo2',
        name: 'Daniel Bekele',
        subjects: 'Chemistry, Biology',
        experience: '8',
        languages: 'English, Amharic, Afaan Oromo',
        photo_url: 'https://media.base44.com/images/public/69c7840dbd33d5309cbe2c2d/b74be63cd_generated_c49feeac.png',
    },
    {
        id: 'demo3',
        name: 'Sara Getachew',
        subjects: 'English, Literature',
        experience: '3',
        languages: 'English, Amharic',
        photo_url: 'https://media.base44.com/images/public/69c7840dbd33d5309cbe2c2d/cc690ef8f_generated_e69331c4.png',
    },
];

export default function FeaturedTutors() {
    const { t } = useLanguage();

    const { data: tutors } = useQuery({
        queryKey: ['featured-tutors'],
        queryFn: () => base44.entities.Tutor.filter({ featured: true }, '-created_date', 6),
        initialData: [],
    });

    const displayTutors = tutors.length > 0 ? tutors : defaultTutors;

    return (
        <section className="py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        {t('featured.title')}
                    </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayTutors.map((tutor, i) => (
                        <motion.div
                            key={tutor.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50">
                                <div className="relative h-56 overflow-hidden bg-muted">
                                    <img
                                        src={tutor.photo_url || 'https://media.base44.com/images/public/69c7840dbd33d5309cbe2c2d/a1d27c987_generated_45695058.png'}
                                        alt={tutor.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-card/90 text-foreground backdrop-blur-sm gap-1">
                                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                            5.0
                                        </Badge>
                                    </div>
                                </div>
                                <CardContent className="p-5">
                                    <h3 className="font-semibold text-foreground text-lg">{tutor.name}</h3>
                                    <p className="text-sm text-primary font-medium mt-1">
                                        {tutor.experience} {t('featured.experience')}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {tutor.subjects?.split(',').map((s, idx) => (
                                            <Badge key={idx} variant="secondary" className="text-xs">
                                                {s.trim()}
                                            </Badge>
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-3">
                                        {t('featured.languages')}: {tutor.languages}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}