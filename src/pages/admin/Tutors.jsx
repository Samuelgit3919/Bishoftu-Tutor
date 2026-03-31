import React, { useState } from "react";
import { mockDatabase as base44 } from "@/lib/mockApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2, Search, Plus, Pencil, Star } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const emptyTutor = {
    name: "",
    subjects: "",
    experience: "",
    availability: "",
    languages: "",
    contact_info: "",
    notes: "",
    featured: false,
};

export default function Tutors() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyTutor);

    /* ---------------- Fetch Tutors ---------------- */
    const { data: tutors = [], isLoading } = useQuery({
        queryKey: ["admin-tutors"],
        queryFn: () => base44.entities.Tutor.list("-created_date", 100),
    });

    /* ---------------- Create Tutor ---------------- */
    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.Tutor.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-tutors"] });
            setDialogOpen(false);
            setForm(emptyTutor);
            toast.success("Tutor created successfully 🎉");
        },
        onError: () => toast.error("Failed to create tutor"),
    });

    /* ---------------- Update Tutor ---------------- */
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.Tutor.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-tutors"] });
            setDialogOpen(false);
            setForm(emptyTutor);
            setEditing(null);
            toast.success("Tutor updated successfully ✨");
        },
        onError: () => toast.error("Failed to update tutor"),
    });

    /* ---------------- Delete Tutor ---------------- */
    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.Tutor.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-tutors"] });
            toast.success("Tutor deleted 🗑️");
        },
        onError: () => toast.error("Failed to delete tutor"),
    });

    /* ---------------- Helpers ---------------- */
    const openCreate = () => {
        setEditing(null);
        setForm(emptyTutor);
        setDialogOpen(true);
    };

    const openEdit = (tutor) => {
        setEditing(tutor);
        setForm(tutor);
        setDialogOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editing
            ? updateMutation.mutate({ id: editing.id, data: form })
            : createMutation.mutate(form);
    };

    const handleChange = (field, value) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const filtered = tutors.filter(
        (t) =>
            t.name?.toLowerCase().includes(search.toLowerCase()) ||
            t.subjects?.toLowerCase().includes(search.toLowerCase())
    );

    /* ---------------- UI ---------------- */
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Tutors</h1>
                <Button onClick={openCreate} className="gap-2">
                    <Plus className="w-4 h-4" /> Add Tutor
                </Button>
            </div>

            {/* Table Card */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>All Tutors ({filtered.length})</CardTitle>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search tutor..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-8 w-52"
                            />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Subjects</TableHead>
                                <TableHead>Languages</TableHead>
                                <TableHead>Featured</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">
                                        Loading tutors...
                                    </TableCell>
                                </TableRow>
                            )}

                            {filtered.map((tutor) => (
                                <TableRow key={tutor.id}>
                                    <TableCell className="font-medium">{tutor.name}</TableCell>
                                    <TableCell>{tutor.subjects}</TableCell>
                                    <TableCell>{tutor.languages}</TableCell>
                                    <TableCell>
                                        {tutor.featured && (
                                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                        )}
                                    </TableCell>
                                    <TableCell className="flex gap-1">
                                        <Button size="icon" variant="ghost" onClick={() => openEdit(tutor)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="text-destructive"
                                            onClick={() => deleteMutation.mutate(tutor.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {!isLoading && filtered.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">
                                        No tutors found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? "Edit Tutor" : "Add Tutor"}</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <Input
                            placeholder="Name"
                            required
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                        <Input
                            placeholder="Subjects"
                            required
                            value={form.subjects}
                            onChange={(e) => handleChange("subjects", e.target.value)}
                        />
                        <Input
                            placeholder="Languages"
                            value={form.languages}
                            onChange={(e) => handleChange("languages", e.target.value)}
                        />

                        <div className="flex items-center gap-2">
                            <Switch
                                checked={form.featured}
                                onCheckedChange={(v) => handleChange("featured", v)}
                            />
                            <Label>Featured tutor</Label>
                        </div>

                        <Button className="w-full">
                            {editing ? "Update Tutor" : "Create Tutor"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}