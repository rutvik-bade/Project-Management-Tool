// src/features/projects/stores/projectStore.ts

import { create } from 'zustand';
import client from '@/lib/apolloClient';
import { GET_PROJECTS, CREATE_PROJECT, UPDATE_PROJECT_STATUS } from '../services/projectServices';
import type { ProjectActions, ProjectState } from '../types/projectTypes';

export const useProjectStore = create<ProjectState & ProjectActions>((set, get) => ({
    projects: [],
    selectedProjectId: null,
    loading: false,
    error: null,
    isCreating: false,
    createError: null,

    // Actions
    selectProject: (projectId) => {
        set({ selectedProjectId: projectId ? projectId : undefined });
    },

    fetchProjects: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_PROJECTS,
                fetchPolicy: 'network-only',
            });
            set({ projects: data.projects, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    createProject: async (newProjectData) => {
        set({ isCreating: true, createError: null });
        try {
            const { data } = await client.mutate({
                mutation: CREATE_PROJECT,
                variables: {
                    ...newProjectData,
                    dueDate: newProjectData.dueDate || null,
                },
            });

            // Update the store with the new project
            const newProject = data.createProject.project || data.createProject;
            set((state) => ({
                projects: [newProject, ...state.projects],
                isCreating: false,
            }));

            return true;
        } catch (err: any) {
            set({ createError: err.message, isCreating: false });
            return false;
        }
    },

    //TODO: Add types for projectId and status
    updateProjectStatus: async (projectId: any, status: any) => {
        try {
            await client.mutate({
                mutation: UPDATE_PROJECT_STATUS,
                variables: { id: projectId, status },
            });
            // Update the status in our local state
            set((state) => ({
                projects: state.projects.map((p) =>
                    p.id === projectId ? { ...p, status } : p
                ),
            }));
        } catch (error: any) {
            console.error("Failed to update project status:", error.message);
            // Optionally set an error state here
        }
    },
}));