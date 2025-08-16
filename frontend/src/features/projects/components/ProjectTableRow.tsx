import { TableCell, TableRow } from "@/components/ui/table";
import { ProgressCircle } from "@/components/ui/progressCircle";
import { ProjectStatusBadge } from "@/components/ui/projectStatusBadge";
import type { Project } from "../types/projectTypes";

// Helper to format date
const formatDate = (dateString: string | null) => {
  if (!dateString) return <span className="text-muted-foreground">N/A</span>;
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface ProjectTableRowProps {
  project: Project;
}

export function ProjectTableRow({ project }: ProjectTableRowProps) {
  const totalTasks = project.taskCount;
  const progress = totalTasks > 0 ? project.completedTasks / totalTasks : 0;

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <ProgressCircle progress={progress} />
          <span className="font-medium">{project.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <ProjectStatusBadge status={project.status} />
      </TableCell>
      <TableCell className="text-muted-foreground">
        {project.completedTasks} / {totalTasks}
      </TableCell>
      <TableCell>{formatDate(project.dueDate)}</TableCell>
    </TableRow>
  );
}