import { create } from 'zustand';
import client from '@/lib/apolloClient'; // Your Apollo Client instance
import { GET_PROJECTS, CREATE_PROJECT } from '../services/projectServices';
import type { Project, ProjectState, ProjectActions } from '../types/projectTypes'; // We'll create this next

//Abstracting data fetching and mutation logic into Zustand store
export const useProjectStore = create<ProjectState & ProjectActions>((set, get) => ({
    // Initial State
    projects: [],
    loading: false,
    error: null,
    isCreating: false,
    createError: null,

    // Actions
    fetchProjects: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_PROJECTS,
                fetchPolicy: 'network-only', // Ensure fresh data
            });
            set({ projects: data.projects, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    createProject: async (newProjectData) => {
        set({ isCreating: true, createError: null });
        try {
            await client.mutate({
                mutation: CREATE_PROJECT,
                variables: {
                    ...newProjectData,
                    dueDate: newProjectData.dueDate || null,
                },
            });

            // Refetch the projects list to include the new one
            await get().fetchProjects();

            set({ isCreating: false });
            return true; // Indicate success
        } catch (err: any) {
            set({ createError: err.message, isCreating: false });
            return false; // Indicate failure
        }
    },
}));