import React from 'react'
import { TaskType } from '../gql';
import CreateTask from './CreateTask';
import SortTasks from './SortTasks';

function Column({
    columnHandle,
    name,
    tasks
}: {
    columnHandle: string,
    order: string,
    name: string,
    tasks: TaskType[]
}) {
    return (
        <div className='bg-blue-500 p-4 text-white'>
            <h2 className='p-4 font-bold'>{name ?? "No name"}</h2>
            <ul key={columnHandle}>
                {tasks.map((task, index) => (
                    <>
                        <li key={task.taskHandle} className='bg-black m-4 p-2'>
                            <SortTasks tasks={tasks} index={index} columnHandle={columnHandle} />
                            {task.description}
                        </li>
                    </>
                ))}
            </ul>
            <CreateTask columnHandle={columnHandle} />
        </div>
    )
}

export default Column
