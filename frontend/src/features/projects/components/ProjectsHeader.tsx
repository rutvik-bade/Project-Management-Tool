import { CreateProjectDialog } from "./CreateProjectDialog";

export function ProjectsHeader() {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <CreateProjectDialog />
        </div>
    );
}