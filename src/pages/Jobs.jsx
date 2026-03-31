import React, { useState } from 'react';
import { mockDatabase as base44 } from '@/lib/mockApi';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n.jsx';
import {
    BookOpen, MapPin, Clock, DollarSign, Globe, Search, ArrowRight, Briefcase
} from 'lucide-react';

const langLabel = { en: 'English', am: 'Amharic / አማርኛ', or: 'Afaan Oromo' };

const subjectColors = [
    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
];

function getColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return subjectColors[Math.abs(hash) % subjectColors.length];
}

function timeAgo(dateStr, t) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return t('jobs.today');
    if (days === 1) return t('jobs.yesterday');
    if (days < 7) return `${days} ${t('jobs.daysAgo')}`;
    if (days < 30) return `${Math.floor(days / 7)} ${t('jobs.weeksAgo')}`;
    return `${Math.floor(days / 30)} ${t('jobs.monthsAgo')}`;
}

function JobCard({ job, index, t }) {
    const statusLabel = job.status === 'open' ? t('jobs.statusOpen') : job.status === 'filled' ? t('jobs.statusFilled') : t('jobs.statusClosed');

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="bg-card border border-border/50 rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all group"
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-lg leading-snug group-hover:text-primary transition-colors">
                        {job.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{timeAgo(job.created_date, t)}</p>
                </div>
                <Badge className={`${getColor(job.subject)} border-0 shrink-0 text-xs font-medium`}>
                    {job.subject}
                </Badge>
            </div>

            {job.description && (
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                    {job.description}
                </p>
            )}

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground mb-5">
                <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-primary/60" />
                    {job.level}
                </span>
                {job.schedule && (
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary/60" />
                        {job.schedule}
                    </span>
                )}
                {job.budget && (
                    <span className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-primary/60" />
                        {job.budget}
                    </span>
                )}
                {job.location && (
                    <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary/60" />
                        {job.location}
                    </span>
                )}
                <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-primary/60" />
                    {langLabel[job.preferred_language] || 'English'}
                </span>
            </div>

            <div className="flex items-center justify-between">
                <Badge variant={job.status === 'open' ? 'default' : 'secondary'} className="text-xs">
                    {statusLabel}
                </Badge>
                {job.status === 'open' && (
                    <Button asChild size="sm" className="gap-1.5 rounded-xl text-xs h-8">
                        <Link to="/become-tutor">
                            {t('jobs.applyBtn')} <ArrowRight className="w-3 h-3" />
                        </Link>
                    </Button>
                )}
            </div>
        </motion.div>
    );
}

export default function Jobs() {
    const [search, setSearch] = useState('');
    const { t } = useLanguage();

    const { data: jobs = [], isLoading } = useQuery({
        queryKey: ['posted-jobs'],
        queryFn: () => base44.entities.PostedJob.list('-created_date', 100),
    });

    const filtered = jobs.filter(j => {
        if (j.status === 'closed') return false;
        const q = search.toLowerCase();
        return !q || j.title?.toLowerCase().includes(q) || j.subject?.toLowerCase().includes(q) || j.level?.toLowerCase().includes(q);
    });

    const openCount = filtered.filter(j => j.status === 'open').length;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero banner */}
            <div className="bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border/40 py-14 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                        <Briefcase className="w-4 h-4" /> {t('jobs.title')}
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                        {t('jobs.heading')}
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto mb-6 text-sm sm:text-base">
                        {t('jobs.subtitle')}
                    </p>
                    <div className="relative max-w-lg mx-auto">
                        <Search className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder={t('jobs.searchPlaceholder')}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-10 h-11 rounded-xl border-border/60"
                        />
                    </div>
                </div>
            </div>

            {/* Jobs grid */}
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-muted-foreground">
                        {isLoading ? t('jobs.loading') : `${openCount} ${openCount !== 1 ? t('jobs.openPositionsPlural') : t('jobs.openPositions')}`}
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-card border border-border/40 rounded-2xl p-6 animate-pulse">
                                <div className="h-4 bg-muted rounded w-3/4 mb-3" />
                                <div className="h-3 bg-muted rounded w-1/2 mb-6" />
                                <div className="h-3 bg-muted rounded w-full mb-2" />
                                <div className="h-3 bg-muted rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">{t('jobs.noJobs')}</p>
                        <p className="text-sm mt-1">{t('jobs.noJobsDesc')}</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((job, i) => (
                            <JobCard key={job.id} job={job} index={i} t={t} />
                        ))}
                    </div>
                )}

                {/* CTA */}
                <div className="mt-16 rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
                    <h3 className="text-xl font-bold text-foreground mb-2">{t('jobs.ctaTitle')}</h3>
                    <p className="text-sm text-muted-foreground mb-5">{t('jobs.ctaDesc')}</p>
                    <Button asChild className="gap-2 rounded-xl">
                        <Link to="/become-tutor">{t('jobs.ctaBtn')} <ArrowRight className="w-4 h-4" /></Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}