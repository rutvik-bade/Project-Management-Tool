import { useTaskStore } from "../stores/taskStore";
import { TaskCard } from "./TaskCard";
import { Skeleton } from "@/components/ui/skeleton";

const TaskListSkeleton = () => (
    <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
        ))}
    </div>
);

export function TaskList() {
    const { tasks, loading, error } = useTaskStore();

    if (loading) {
        return <TaskListSkeleton />;
    }

    if (error) {
        return <p className="text-destructive">Error loading tasks: {error}</p>;
    }

    if (tasks.length === 0) {
        return <p className="text-muted-foreground">No tasks found for this project.</p>;
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}