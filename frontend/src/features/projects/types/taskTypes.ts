export type Task = {
    id: string;
    title: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    assigneeEmail: string | null;
    dueDate: string | null;
};

export type TaskState = {
    tasks: Task[];
    loading: boolean;
    error: string | null;
};

export type TaskActions = {
    fetchTasks: (projectId: number) => Promise<void>;
    clearTasks: () => void;
};