import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n.jsx';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-card border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div>
                            <span className="text-base font-bold text-foreground">TutorHub</span>
                            <p className="text-xs text-muted-foreground">{t('footer.tagline')}</p>
                        </div>
                    </div>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <Link to="/request-tutor" className="hover:text-foreground transition-colors">
                            {t('nav.requestTutor')}
                        </Link>
                        <Link to="/become-tutor" className="hover:text-foreground transition-colors">
                            {t('nav.becomeTutor')}
                        </Link>
                        <Link to="/ai-experience" className="hover:text-foreground transition-colors">
                            {t('nav.aiExperience')}
                        </Link>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} TutorHub. {t('footer.rights')}
                </div>
            </div>
        </footer>
    );
}