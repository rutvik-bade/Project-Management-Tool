import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Task } from "../types/taskTypes";
import { cn } from "@/lib/utils";

const statusStyles: Record<Task['status'], string> = {
    TODO: "bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30",
    IN_PROGRESS: "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30",
    DONE: "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30",
};

export function TaskCard({ task }: { task: Task }) {
    const getInitials = (email: string | null) => {
        if (!email) return "?";
        return email.substring(0, 2).toUpperCase();
    };

    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">{task.title}</CardTitle>
                <Badge className={cn("capitalize", statusStyles[task.status])}>{task.status.replace("_", " ")}</Badge>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                    Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
                </div>
                {task.assigneeEmail && (
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={`https://i.pravatar.cc/40?u=${task.assigneeEmail}`} />
                        <AvatarFallback>{getInitials(task.assigneeEmail)}</AvatarFallback>
                    </Avatar>
                )}
            </CardContent>
        </Card>
    );
}