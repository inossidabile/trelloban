import React from 'react';
import { useQuery } from '@apollo/client';
import { ColumnType, QUERY_BOARD, TaskType } from '../gql';
import Column from './Column';
import CreateColumn from './CreateColumn';
import { compare } from '../utils';

function App() {
  const { loading, error, data } = useQuery(QUERY_BOARD);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const columnns: ColumnType[] = data.board.columns;
  const tasks: TaskType[] = data.board.tasks;

  return (
    <>
      <div className="grid grid-flow-col auto-cols-max p-8">
        {columnns.slice().sort(compare).map((column) => (
          <Column key={column.columnHandle}
            {...column}
            tasks={tasks.filter(x => x.columnHandle === column.columnHandle).sort(compare)}
          />
        ))}
      </div >
      <CreateColumn />
    </>
  )
}

export default App
