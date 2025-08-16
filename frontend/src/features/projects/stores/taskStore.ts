import { create } from 'zustand';
import client from '@/lib/apolloClient';
import { GET_TASKS_BY_PROJECT } from '../services/taskServices';
import type { TaskActions, TaskState } from '../types/taskTypes';


export const useTaskStore = create<TaskState & TaskActions>((set) => ({
    tasks: [],
    loading: false,
    error: null,

    fetchTasks: async (projectId) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_TASKS_BY_PROJECT,
                variables: { projectId },
                fetchPolicy: 'network-only',
            });
            set({ tasks: data.tasks, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    clearTasks: () => {
        set({ tasks: [], error: null });
    },
}));