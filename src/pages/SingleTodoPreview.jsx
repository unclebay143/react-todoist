import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getLocalStorage } from "../utils/local-storage";

const SingleTodoPreview = () => {
  const { todo_id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const getTodoById = () => {
      const todo_ls_name = process.env.REACT_APP_TODO_LOCAL_STORAGE_NAME;
      const todo_db = getLocalStorage(todo_ls_name);
      const currentTodo = todo_db.find((todo) => todo.id === todo_id);
      setTimeout(() => {
        setTodo(currentTodo);
      }, 2000);
    };

    if (todo_id) {
      getTodoById();
    }
  }, [todo_id]);

  if (!todo) {
    return <p>Loading</p>;
  }

  return (
    <>
      <header className='px-5 py-4 max-w-lg mx-auto'>
        <h1 className='text-4xl text-slate-700 font-medium'>Todoist</h1>
      </header>
      <main className='px-5 mt-5 max-w-lg mx-auto'>
        <section id='todo_preview_container'>
          <section className='flex justify-between items-center'>
            <h3 className='text-xl font-semibold'>{todo.title}</h3>
            <div className='flex items-center gap-2'>
              <button
              // onclick='handleEditMode()'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-5 h-5 text-slate-600 hover:text-slate-800'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                  />
                </svg>
              </button>
              <button
              //  onclick='deleteTodo()'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-5 h-5 text-slate-600 hover:text-slate-800'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </button>
            </div>
          </section>
          <section className='mt-3'>
            <p className='text-slate-700'>{todo.description}</p>
            <section className='mt-3'>
              <span className='text-sm'>{todo.created_at}</span>
              <span className='mx-1'>·</span>
              <span className='bg-slate-400 text-xs rounded-full px-1 py-0.5 text-slate-800'>
                Pending
              </span>
            </section>
          </section>
        </section>
        <section className='mt-10'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-slate-600 hover:text-blue-500'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-4 h-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
              />
            </svg>
            <span className='text-sm'>View all todos</span>
          </Link>
        </section>
      </main>
    </>
  );
};

export default SingleTodoPreview;
