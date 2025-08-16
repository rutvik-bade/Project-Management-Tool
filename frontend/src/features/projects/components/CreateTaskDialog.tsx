import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTaskStore } from "../stores/taskStore";
import type { Task } from "../types/taskTypes";

const initialFormState = {
    title: "",
    status: "TODO" as Task['status'],
    description: "",
    assigneeEmail: "",
    dueDate: "",
};

interface CreateTaskDialogProps {
    projectId: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateTaskDialog({ projectId, open, onOpenChange }: CreateTaskDialogProps) {
    const [formData, setFormData] = useState(initialFormState);
    const { createTask, isCreating, createError } = useTaskStore();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleStatusChange = (value: Task['status']) => {
        setFormData((prev) => ({ ...prev, status: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title) {
            alert("Task title is required.");
            return;
        }

        const success = await createTask({ ...formData, projectId });

        if (success) {
            onOpenChange(false); // Close the dialog
            setFormData(initialFormState); // Reset form for next time
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a New Task</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to add a task to this project.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} id="create-task-form">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Title</Label>
                            <Input id="title" value={formData.title} onChange={handleInputChange} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">Status</Label>
                            <Select value={formData.status} onValueChange={handleStatusChange}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TODO">To Do</SelectItem>
                                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                    <SelectItem value="DONE">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Description</Label>
                            <Textarea id="description" value={formData.description} onChange={handleInputChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="assigneeEmail" className="text-right">Assignee</Label>
                            <Input id="assigneeEmail" type="email" placeholder="user@example.com" value={formData.assigneeEmail} onChange={handleInputChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                            <Input id="dueDate" type="date" value={formData.dueDate} onChange={handleInputChange} className="col-span-3" />
                        </div>
                    </div>
                </form>
                {createError && <p className="text-sm text-destructive">Error: {createError}</p>}
                <DialogFooter>
                    <Button type="submit" form="create-task-form" disabled={isCreating}>
                        {isCreating ? "Creating..." : "Create Task"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}