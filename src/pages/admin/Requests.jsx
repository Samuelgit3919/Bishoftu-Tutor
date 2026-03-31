import React, { useState } from 'react';
import { mockDatabase as base44 } from '@/lib/mockApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Search, UserPlus, Megaphone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    assigned: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
};

export default function Requests() {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [assignDialogOpen, setAssignDialogOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const queryClient = useQueryClient();
    // const { toast } = useToast(); removed for sonner

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['admin-requests'],
        queryFn: () => base44.entities.TutorRequest.list('-created_date', 100),
    });

    const { data: tutors = [] } = useQuery({
        queryKey: ['admin-tutors'],
        queryFn: () => base44.entities.Tutor.list('-created_date', 100),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.TutorRequest.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-requests'] }),
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.TutorRequest.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-requests'] }),
    });

    const postJobMutation = useMutation({
        mutationFn: (req) => base44.entities.PostedJob.create({
            title: `${req.subject} Tutor Needed – ${req.level}`,
            subject: req.subject,
            level: req.level,
            schedule: req.schedule,
            budget: req.budget,
            location: req.location,
            preferred_language: req.preferred_language || 'en',
            description: req.schedule ? `Looking for a ${req.subject} tutor. Schedule: ${req.schedule}.` : `Looking for a ${req.subject} tutor.`,
            status: 'open',
            source_request_id: req.id,
        }),
        onSuccess: () => toast({ title: 'Job Posted!', description: 'Visible on the public job board.' }),
    });

    const handleAssign = (tutorId) => {
        const tutor = tutors.find(t => t.id === tutorId);
        if (!selectedRequest || !tutor) return;
        updateMutation.mutate({
            id: selectedRequest.id,
            data: {
                status: 'assigned',
                assigned_tutor_id: tutorId,
                assigned_tutor_name: tutor.name,
            }
        });
        setAssignDialogOpen(false);
        toast({ title: 'Tutor Assigned', description: `${tutor.name} assigned to ${selectedRequest.full_name}` });
    };

    const filtered = requests.filter(r => {
        const matchSearch = r.full_name?.toLowerCase().includes(search.toLowerCase()) ||
            r.subject?.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'all' || r.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground">Tutor Requests</h1>

            <Card className="border-border/50">
                <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <CardTitle className="text-base">All Requests ({filtered.length})</CardTitle>
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
                                    <TableHead>Name</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Lang</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Assigned To</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map(req => (
                                    <TableRow key={req.id}>
                                        <TableCell className="font-medium">{req.full_name}</TableCell>
                                        <TableCell>{req.subject}</TableCell>
                                        <TableCell>{req.level}</TableCell>
                                        <TableCell className="text-xs">{req.phone}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-xs">{req.preferred_language || 'en'}</Badge>
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
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="assigned">Assigned</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-xs text-muted-foreground">
                                            {req.assigned_tutor_name || '—'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-primary"
                                                    title="Post as Job"
                                                    onClick={() => postJobMutation.mutate(req)}
                                                >
                                                    <Megaphone className="w-3.5 h-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => { setSelectedRequest(req); setAssignDialogOpen(true); }}
                                                >
                                                    <UserPlus className="w-3.5 h-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-destructive"
                                                    onClick={() => deleteMutation.mutate(req.id)}
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
                                            No requests found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Assign Tutor Dialog */}
            <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Assign Tutor to {selectedRequest?.full_name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {tutors.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-4 text-center">No tutors available. Add tutors first.</p>
                        ) : (
                            tutors.map(tutor => (
                                <button
                                    key={tutor.id}
                                    onClick={() => handleAssign(tutor.id)}
                                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-muted transition-colors border border-border/50"
                                >
                                    <p className="font-medium text-sm text-foreground">{tutor.name}</p>
                                    <p className="text-xs text-muted-foreground">{tutor.subjects} · {tutor.languages}</p>
                                </button>
                            ))
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}