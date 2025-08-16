import { useEffect } from "react";
import { useProjectStore } from "../stores/projectStore";
import { useTaskStore } from "../stores/taskStore";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardAction,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, PlusCircle } from "lucide-react";
import { TaskList } from "./TaskList";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Project } from "../types/projectTypes";

export function ProjectDetailView() {
    const { projects, selectedProjectId, selectProject, updateProjectStatus } = useProjectStore();
    const { fetchTasks, clearTasks } = useTaskStore();

    const selectedProject = projects.find(p => p.id === selectedProjectId);

    useEffect(() => {
        if (selectedProjectId) {
            fetchTasks(selectedProjectId);
        }
        return () => {
            clearTasks();
        };
    }, [selectedProjectId, fetchTasks, clearTasks]);

    if (!selectedProject) {
        return null;
    }

    const handleStatusChange = (newStatus: Project['status']) => {
        updateProjectStatus(selectedProject.id, newStatus);
    };

    return (
        <Card className="sticky top-6">
            <CardHeader className="flex-row items-start justify-between">
                <div>
                    <CardTitle className="text-2xl">{selectedProject.name}</CardTitle>
                    <CardDescription>{selectedProject.description || "No description provided."}</CardDescription>
                </div>

                <CardAction>
                    <Button variant="outline" size="icon" onClick={() => selectProject(null)}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <Select value={selectedProject.status} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="ON_HOLD">On Hold</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <h3 className="mb-4 text-lg font-semibold">Tasks</h3>
                    <TaskList />
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Task
                </Button>
            </CardFooter>
        </Card>
    );
}