import { gql } from "@apollo/client";

export const GET_TASKS_BY_PROJECT = gql`
  query GetTasksByProject($projectId: ID!) {
    tasks(projectId: $projectId) {
      id
      title
      status
      assigneeEmail
      dueDate
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask(
    $projectId: ID!
    $title: String!
    $status: String
    $description: String
    $assigneeEmail: String
    $dueDate: DateTime
  ) {
    createTask(
      projectId: $projectId
      title: $title
      status: $status
      description: $description
      assigneeEmail: $assigneeEmail
      dueDate: $dueDate
    ) {
      task {
        id
        title
        status
        assigneeEmail
        dueDate
      }
    }
  }
`;