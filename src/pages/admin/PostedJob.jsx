import React, { useState } from 'react';
import { mockDatabase as base44 } from '@/lib/mockApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Search, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const statusColors = {
    open: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    filled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    closed: 'bg-gray-100 text-gray-600 dark:bg-gray-800/30 dark:text-gray-400',
};

const langLabel = { en: 'English', am: 'Amharic', or: 'Afaan Oromo' };

export default function PostedJobs() {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const queryClient = useQueryClient();
    // const { toast } = useToast(); removed for sonner

    const { data: jobs = [], isLoading } = useQuery({
        queryKey: ['admin-posted-jobs'],
        queryFn: () => base44.entities.PostedJob.list('-created_date', 100),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.PostedJob.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-posted-jobs'] }),
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.PostedJob.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-posted-jobs'] });
            toast({ title: 'Job deleted' });
        },
    });

    const toggleStatus = (job) => {
        const newStatus = job.status === 'open' ? 'closed' : 'open';
        updateMutation.mutate({ id: job.id, data: { status: newStatus } });
        toast({ title: newStatus === 'open' ? 'Job reopened' : 'Job closed' });
    };

    const filtered = jobs.filter(j => {
        const q = search.toLowerCase();
        const matchSearch = !q || j.title?.toLowerCase().includes(q) || j.subject?.toLowerCase().includes(q);
        const matchStatus = filterStatus === 'all' || j.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Posted Jobs</h1>
                <Button asChild variant="outline" size="sm" className="gap-2">
                    <Link to="/jobs" target="_blank">
                        <ExternalLink className="w-3.5 h-3.5" /> View Public Board
                    </Link>
                </Button>
            </div>

            <Card className="border-border/50">
                <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <CardTitle className="text-base">All Posted Jobs ({filtered.length})</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="pl-8 h-9 w-48"
                                />
                            </div>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-28 h-9">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="filled">Filled</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead>Schedule</TableHead>
                                    <TableHead>Budget</TableHead>
                                    <TableHead>Language</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map(job => (
                                    <TableRow key={job.id}>
                                        <TableCell className="font-medium max-w-[200px] truncate">{job.title}</TableCell>
                                        <TableCell>{job.subject}</TableCell>
                                        <TableCell>{job.level}</TableCell>
                                        <TableCell className="text-xs text-muted-foreground">{job.schedule || '—'}</TableCell>
                                        <TableCell className="text-xs text-muted-foreground">{job.budget || '—'}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-xs">{langLabel[job.preferred_language] || 'en'}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={job.status}
                                                onValueChange={v => updateMutation.mutate({ id: job.id, data: { status: v } })}
                                            >
                                                <SelectTrigger className="h-7 w-24 text-xs">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="open">Open</SelectItem>
                                                    <SelectItem value="filled">Filled</SelectItem>
                                                    <SelectItem value="closed">Closed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    title={job.status === 'open' ? 'Close job' : 'Reopen job'}
                                                    onClick={() => toggleStatus(job)}
                                                >
                                                    {job.status === 'open' ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-destructive"
                                                    onClick={() => deleteMutation.mutate(job.id)}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filtered.length === 0 && !isLoading && (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                            No posted jobs. Post a job from the Requests page.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}