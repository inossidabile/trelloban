import { gql } from "@apollo/client";

export type ColumnType = {
  columnHandle: string;
  order: string;
  name: string;
};

export type TaskType = {
  columnHandle: string;
  taskHandle: string;
  order: string;
  description: string;
};

export const QUERY_BOARD = gql`
  query {
    board(handle: "boardy") {
      columns {
        columnHandle
        order
        name
      }
      tasks {
        columnHandle
        taskHandle
        order
        description
      }
    }
  }
`;

export const CREATE_COLUMN = gql`
  mutation CreateColumn($name: String!) {
    createColumn(boardHandle: "boardy", name: $name) {
      column {
        columnHandle
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($columnHandle: String!, $description: String!) {
    createTask(boardHandle: "boardy", columnHandle: $columnHandle, description: $description) {
      task {
        columnHandle
      }
    }
  }
`;

export const SORT_TASKS = gql`
  mutation SortTasks($columnHandle: String!, $taskHandles: [String!]!) {
    sortTasks(boardHandle: "boardy", columnHandle: $columnHandle, taskHandles: $taskHandles) {
      taskHandles
    }
  }
`;
