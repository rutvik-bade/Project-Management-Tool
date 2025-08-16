export type Task = {
    id: string;
    title: string;
    description?: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    assigneeEmail: string | null;
    dueDate: string | null;
};

export type TaskState = {
    tasks: Task[];
    loading: boolean;
    isCreating: boolean;
    createError: string | null;
    error: string | null;
};

export type TaskActions = {
    fetchTasks: (projectId: number) => Promise<void>;
    clearTasks: () => void;
    createTask: (
        newTaskData: {
            projectId: number;
            title: string;
            status?: Task['status'];
            description?: string;
            assigneeEmail?: string;
            dueDate?: string | null;
        }) => Promise<boolean>;
};