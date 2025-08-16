import { useEffect } from "react";
import { useProjectStore } from "../stores/projectStore";
import { ProjectsHeader } from "../components/ProjectsHeader";
import { ProjectTable } from "../components/ProjectTable";
import { ProjectTableSkeleton } from "../components/ProjectTableSkeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";

export default function Projects() {
  // Select state and actions from the Zustand store
  const { projects, loading, error, fetchProjects } = useProjectStore();

  // Fetch projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (error) {
    return <p className="text-destructive">Error: {error}</p>;
  }

  return (
    <div className="space-y-6">
      <ProjectsHeader />

      {loading ? (
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
            <ProjectTableSkeleton />
          </Table>
        </div>
      ) : (
        <ProjectTable projects={projects} />
      )}
    </div>
  );
}