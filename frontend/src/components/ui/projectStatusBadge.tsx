import { Badge } from "@/components/ui/badge";

type ProjectStatus = "ACTIVE" | "COMPLETED" | "ON_HOLD";

interface ProjectStatusBadgeProps {
    status: ProjectStatus;
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
    const statusConfig: {
        variant: string;
        label: string;
        className: string;
    } | undefined = {
        ACTIVE: {
            variant: "default",
            label: "Active",
            className: "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30",
        },
        COMPLETED: {
            variant: "default",
            label: "Completed",
            className: "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30",
        },
        ON_HOLD: {
            variant: "secondary",
            label: "On Hold",
            className: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
        },
    }[status];

    if (!statusConfig) return null;

    return (
        <Badge
            variant="default"
            className={`capitalize ${statusConfig.className}`}
        >
            {statusConfig.label}
        </Badge>
    );
}