import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ProjectTableRow } from "./ProjectTableRow";
import type { Project } from "../types/projectTypes";

interface ProjectTableProps {
    projects: Project[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40%]">Project</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Due Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.map((project) => (
                        <ProjectTableRow key={project.id} project={project} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}