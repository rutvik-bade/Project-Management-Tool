import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      status
      dueDate
      taskCount
      completedTasks
      description
    }
  }
`;


export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!
    $status: String!
    $description: String
    $dueDate: Date
  ) {
    createProject(
      name: $name
      status: $status
      description: $description
      dueDate: $dueDate
    ) {
      project {
        id
        name
        status
        dueDate
        taskCount
        completedTasks
      }
    }
  }
`;


export const UPDATE_PROJECT_STATUS = gql`
  mutation UpdateProjectStatus($id: ID!, $status: String!) {
    updateProject(id: $id, status: $status) {
      project {
        id
        status
      }
    }
  }
`;