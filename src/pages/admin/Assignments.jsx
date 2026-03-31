import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    assigned: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
};

export default function Assignments() {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const queryClient = useQueryClient();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['admin-requests'],
        queryFn: () => base44.entities.TutorRequest.list('-created_date', 100),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.TutorRequest.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-requests'] }),
    });

    // Only show assigned/completed requests
    const assignments = requests.filter(r => r.assigned_tutor_name);

    const filtered = assignments.filter(r => {
        const matchSearch = r.full_name?.toLowerCase().includes(search.toLowerCase()) ||
            r.assigned_tutor_name?.toLowerCase().includes(search.toLowerCase()) ||
            r.subject?.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'all' || r.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground">Assignments</h1>

            <Card className="border-border/50">
                <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <CardTitle className="text-base">Tutor-Student Assignments ({filtered.length})</CardTitle>
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
                                    <SelectItem value="assigned">Assigned</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
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
                                    <TableHead>Student</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead>Assigned Tutor</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map(req => (
                                    <TableRow key={req.id}>
                                        <TableCell className="font-medium">{req.full_name}</TableCell>
                                        <TableCell>{req.subject}</TableCell>
                                        <TableCell>{req.level}</TableCell>
                                        <TableCell className="font-medium text-primary">{req.assigned_tutor_name}</TableCell>
                                        <TableCell>
                                            <Badge className={`${statusColors[req.status]} text-xs border-0`}>
                                                {req.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={req.status}
                                                onValueChange={v => updateMutation.mutate({ id: req.id, data: { status: v } })}
                                            >
                                                <SelectTrigger className="h-7 w-28 text-xs">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="assigned">Assigned</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filtered.length === 0 && !isLoading && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            No assignments found
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