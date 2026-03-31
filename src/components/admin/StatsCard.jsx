import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function StatsCard({ title, value, icon: Icon, color, loading }) {
    return (
        <Card className="border-border/50">
            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
                        {loading ? (
                            <div className="h-8 w-16 bg-muted rounded animate-pulse mt-2" />
                        ) : (
                            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
                        )}
                    </div>
                    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}