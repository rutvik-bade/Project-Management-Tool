import { useEffect } from "react";
import { useProjectStore } from "../stores/projectStore";
import { ProjectsHeader } from "../components/ProjectsHeader";
import { ProjectTable } from "../components/ProjectTable";
import { ProjectTableSkeleton } from "../components/ProjectTableSkeleton";
import { ProjectDetailView } from "../components/ProjectDetailView";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";

export default function Projects() {
  // Select state and actions from the Zustand store
  const { projects, loading, error, fetchProjects, selectedProjectId } = useProjectStore();

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
        {/* Left Column: Project Table */}
        <div className="lg:col-span-1">
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

        {/* Right Column: Detail View */}
        <div className="lg:col-span-1">
          {selectedProjectId && <ProjectDetailView />}
        </div>
      </div>
    </div>
  );
}