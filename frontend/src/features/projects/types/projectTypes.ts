export type Project = {
    id: number;
    name: string;
    description?: string;
    status: "ACTIVE" | "COMPLETED" | "ON_HOLD";
    dueDate: string | null;
    taskCount: number;
    completedTasks: number;
};

export type ProjectState = {
    projects: Project[];
    loading: boolean;
    selectedProjectId: number | null;
    error: string | null;
    isCreating: boolean; // Separate loading state for creation
    createError: string | null;
};

export type ProjectActions = {
    fetchProjects: () => Promise<void>;
    createProject: (newProjectData: {
        name: string;
        status: string;
        description?: string;
        dueDate?: string | null;
    }) => Promise<boolean>; // Return true on success, false on failure
    selectProject: (projectId: number | null) => void;
    updateProjectStatus: (projectId: number, status: Project['status']) => Promise<void>;
};
