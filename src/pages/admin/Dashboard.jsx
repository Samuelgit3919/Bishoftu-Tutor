import React from 'react';
import { mockDatabase as base44 } from '@/lib/mockApi';
import { useQuery } from '@tanstack/react-query';
import { FileText, UserCheck, Users, LinkIcon } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    assigned: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

export default function Dashboard() {
    const { data: requests = [], isLoading: loadReq } = useQuery({
        queryKey: ['admin-requests'],
        queryFn: () => base44.entities.TutorRequest.list('-created_date', 50),
    });

    const { data: applications = [], isLoading: loadApp } = useQuery({
        queryKey: ['admin-applications'],
        queryFn: () => base44.entities.TutorApplication.list('-created_date', 50),
    });

    const { data: tutors = [], isLoading: loadTut } = useQuery({
        queryKey: ['admin-tutors'],
        queryFn: () => base44.entities.Tutor.list('-created_date', 50),
    });

    const activeAssignments = requests.filter(r => r.status === 'assigned').length;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Tutor Requests"
                    value={requests.length}
                    icon={FileText}
                    color="bg-primary/10 text-primary"
                    loading={loadReq}
                />
                <StatsCard
                    title="Applications"
                    value={applications.length}
                    icon={UserCheck}
                    color="bg-accent/10 text-accent"
                    loading={loadApp}
                />
                <StatsCard
                    title="Total Tutors"
                    value={tutors.length}
                    icon={Users}
                    color="bg-chart-3/10 text-chart-3"
                    loading={loadTut}
                />
                <StatsCard
                    title="Active Assignments"
                    value={activeAssignments}
                    icon={LinkIcon}
                    color="bg-chart-4/10 text-chart-4"
                    loading={loadReq}
                />
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-border/50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Recent Requests</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border">
                            {requests.slice(0, 5).map(req => (
                                <div key={req.id} className="px-5 py-3 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{req.full_name}</p>
                                        <p className="text-xs text-muted-foreground">{req.subject} · {req.level}</p>
                                    </div>
                                    <Badge className={statusColors[req.status] + ' text-xs border-0'}>
                                        {req.status}
                                    </Badge>
                                </div>
                            ))}
                            {requests.length === 0 && !loadReq && (
                                <div className="px-5 py-8 text-center text-sm text-muted-foreground">No requests yet</div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Recent Applications</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border">
                            {applications.slice(0, 5).map(app => (
                                <div key={app.id} className="px-5 py-3 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{app.full_name}</p>
                                        <p className="text-xs text-muted-foreground">{app.subjects}</p>
                                    </div>
                                    <Badge className={statusColors[app.status] + ' text-xs border-0'}>
                                        {app.status}
                                    </Badge>
                                </div>
                            ))}
                            {applications.length === 0 && !loadApp && (
                                <div className="px-5 py-8 text-center text-sm text-muted-foreground">No applications yet</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}