import { ColumnType, TaskType } from "./gql";

export const compare = (a: ColumnType | TaskType, b: ColumnType | TaskType) => {
    const ao = parseInt(a.order);
    const bo = parseInt(b.order);
    return ao - bo;
  }
  