import { create } from 'zustand';
import client from '@/lib/apolloClient';
import { GET_TASKS_BY_PROJECT, CREATE_TASK } from '../services/taskServices';
import type { TaskActions, TaskState } from '../types/taskTypes';
import { useProjectStore } from './projectStore';

export const useTaskStore = create<TaskState & TaskActions>((set) => ({
    tasks: [],
    loading: false,
    error: null,
    isCreating: false,
    createError: null,

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
    createTask: async (newTaskData) => {
        set({ isCreating: true, createError: null });
        try {
            const { data } = await client.mutate({
                mutation: CREATE_TASK,
                variables: {
                    ...newTaskData,
                    status: newTaskData.status || 'TODO', // Default status
                    dueDate: newTaskData.dueDate || null,
                },
            });

            const newTask = data.createTask.task;
            // Optimistically add the new task to the list
            set((state) => ({
                tasks: [...state.tasks, newTask],
                isCreating: false,
            }));
            useProjectStore.getState().incrementTaskCount(newTaskData.projectId);


            return true; // Success
        } catch (err: any) {
            set({ createError: err.message, isCreating: false });
            return false; // Failure
        }
    },

    clearTasks: () => {
        set({ tasks: [], error: null });
    },
}));