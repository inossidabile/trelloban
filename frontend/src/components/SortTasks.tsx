import React from 'react'
import { useMutation } from '@apollo/client';
import { QUERY_BOARD, SORT_TASKS, TaskType } from '../gql';

function SortTasks({
    tasks,
    index,
    columnHandle
}: {
    tasks: TaskType[],
    index: number,
    columnHandle: string,
}) {
    const [mutateSortTasks, { loading, error }] = useMutation(SORT_TASKS, {
        refetchQueries: [
            QUERY_BOARD,
        ],
    });

    const sortTasks = (index: number) => {
        if (tasks.length - 1 === index) return;

        const taskHandles = tasks.map(x => x.taskHandle);
        console.log(taskHandles);
        const movingTask = taskHandles.splice(index, 1)[0];
        console.log(taskHandles);
        taskHandles.splice(index + 1, 0, movingTask);
        console.log(taskHandles);

        mutateSortTasks({ variables: { columnHandle, taskHandles } });
    };

    if (loading) return <p className='p-8'>Loading...</p>;
    if (error) return <p className='p-8'>Error : {error.message}</p>;

    return (
        <>
            <button onClick={() => sortTasks(index)}>
                <span className="p-1 mr-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">&darr;</span>
            </button>
        </>
    )
}

export default SortTasks
