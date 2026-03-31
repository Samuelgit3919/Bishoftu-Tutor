import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Search, Check, X, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

export default function Applications() {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const queryClient = useQueryClient();
    // const { toast } = useToast(); removed for sonner

    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['admin-applications'],
        queryFn: () => base44.entities.TutorApplication.list('-created_date', 100),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.TutorApplication.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-applications'] }),
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.TutorApplication.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-applications'] }),
    });

    const convertToTutor = async (app) => {
        await base44.entities.Tutor.create({
            name: app.full_name,
            subjects: app.subjects,
            experience: app.experience,
            availability: app.availability,
            languages: app.languages,
            contact_info: `${app.phone} · ${app.email}`,
        });
        updateMutation.mutate({ id: app.id, data: { status: 'approved' } });
        queryClient.invalidateQueries({ queryKey: ['admin-tutors'] });
        toast({ title: 'Tutor Created', description: `${app.full_name} has been added as a tutor.` });
    };

    const filtered = applications.filter(a => {
        const matchSearch = a.full_name?.toLowerCase().includes(search.toLowerCase()) ||
            a.subjects?.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'all' || a.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground">Tutor Applications</h1>

            <Card className="border-border/50">
                <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <CardTitle className="text-base">All Applications ({filtered.length})</CardTitle>
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
                                <SelectTrigger className="w-32 h-9">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
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
                                    <TableHead>Name</TableHead>
                                    <TableHead>Subjects</TableHead>
                                    <TableHead>Experience</TableHead>
                                    <TableHead>Languages</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map(app => (
                                    <TableRow key={app.id}>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium text-sm">{app.full_name}</p>
                                                <p className="text-xs text-muted-foreground">{app.phone}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm">{app.subjects}</TableCell>
                                        <TableCell className="text-sm">{app.experience}</TableCell>
                                        <TableCell className="text-sm">{app.languages}</TableCell>
                                        <TableCell>
                                            <Badge className={`${statusColors[app.status]} text-xs border-0`}>
                                                {app.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                {app.status === 'pending' && (
                                                    <>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7 text-green-600"
                                                            title="Approve & Convert to Tutor"
                                                            onClick={() => convertToTutor(app)}
                                                        >
                                                            <UserPlus className="w-3.5 h-3.5" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7 text-destructive"
                                                            title="Reject"
                                                            onClick={() => updateMutation.mutate({ id: app.id, data: { status: 'rejected' } })}
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                        </Button>
                                                    </>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-destructive"
                                                    onClick={() => deleteMutation.mutate(app.id)}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filtered.length === 0 && !isLoading && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            No applications found
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