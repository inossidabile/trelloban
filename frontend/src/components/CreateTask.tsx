import React from 'react'
import { useMutation } from '@apollo/client';
import { CREATE_TASK, QUERY_BOARD } from '../gql';

function CreateTask({
    columnHandle,
}: {
    columnHandle: string,
}) {
    let input: HTMLInputElement | null;

    const [mutateCreateTask, { loading, error }] = useMutation(CREATE_TASK, {
        refetchQueries: [
            QUERY_BOARD,
        ],
    });

    if (loading) return <p className='p-8'>Loading...</p>;
    if (error) return <p className='p-8'>Error : {error.message}</p>;

    return (
        <>
            <form onSubmit={e => {
                e.preventDefault();
                mutateCreateTask({ variables: { columnHandle, description: input?.value } });
                input!.value = '';
            }}>
                <div className="flex items-center w-full max-w-md mb-3 seva-fields formkit-fields p-4">
                    <div className="relative w-full mr-3 formkit-field">
                        <input ref={node => {
                            input = node;
                        }} placeholder='New task' className="formkit-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    </div>
                    <button>
                        <span className="px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</span>
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreateTask
