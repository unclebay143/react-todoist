import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getLocalStorage, setLocalStorage } from "./utils/local-storage";

import "./App.css";
import { TodoLoader } from "./components/TodoLoader";
import { TodoList } from "./components/TodoList";
import { sortTodosByCreated_At } from "./utils/todo";
import { showConfirmModal } from "./utils/showModal";

const todo_ls_name = process.env.REACT_APP_TODO_LOCAL_STORAGE_NAME;
function App() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [formError, setFormError] = useState({
    isError: false,
    errorMessage: null,
  });
  const [todoIdToUpdate, setTodoIdToUpdate] = useState(null);

  const createTodo = (e) => {
    e.preventDefault();
    try {
      if (!todoInput) {
        setFormError({
          isError: true,
          errorMessage: "Please provide a todo title",
        });

        setTimeout(() => {
          setFormError({
            isError: false,
            errorMessage: null,
          });
        }, 5000);

        return;
      }

      const newTodo = {
        id: uuidv4(),
        title: todoInput,
        created_at: Date.now(),
      };
      // check for ls
      const todos = getLocalStorage(todo_ls_name);

      // add new todo db array
      const new_todos = [...todos, newTodo];

      // add to local storage
      setLocalStorage(todo_ls_name, new_todos);
      fetchTodos();
      setTodoInput("");
    } catch (error) {
      setFormError({
        isError: true,
        errorMessage: error.message,
      });
    }
  };

  // DELETE TODO FUNCTION
  const handleDelete = (id) => {
    const deleteTodo = () => {
      // Get todo ls
      const todo_db = getLocalStorage(todo_ls_name);
      // filter out todos that doesn't match the id
      const new_todo_db = todo_db.filter((todo) => todo.id !== id);
      // set the new todos without the todo that matches the id to the ls
      setLocalStorage(todo_ls_name, new_todo_db);
      fetchTodos();
    };

    showConfirmModal({
      title: "Delete Todo",
      text: "Do you want to delete this todo?",
      icon: "warning",
      confirmButtonText: "Yes!",
      showCancelButton: true,
      cb: deleteTodo,
    });
  };

  // READ TODO FUNCTION
  const fetchTodos = () => {
    const _todos = getLocalStorage(todo_ls_name);
    const sortedTodos = sortTodosByCreated_At(_todos);

    setTodos(sortedTodos);
    setTimeout(() => {
      setLoadingTodos(false);
    }, 2000);
  };

  const handleEditMode = (id) => {
    setIsEditMode(true);
    setTodoIdToUpdate(id);
    const todo_db = getLocalStorage(todo_ls_name);
    const todo_to_update = todo_db.find((todo) => todo.id === id);

    if (!todo_to_update) {
      return;
    }

    setTodoInput(todo_to_update.title);
  };

  const updateTodo = (e) => {
    e.preventDefault();
    if (!todoInput) {
      return setFormError({
        isError: true,
        errorMessage: "Todo title cannot be empty",
      });
    }
    const todo_db = getLocalStorage(todo_ls_name);
    const updated_todo_db = todo_db.map((todo) => {
      if (todo.id === todoIdToUpdate) {
        return { ...todo, title: todoInput };
      } else {
        return todo;
      }
    });

    setLocalStorage(todo_ls_name, updated_todo_db); // update storage
    fetchTodos(); // update UI
    setTodoInput("");
    setIsEditMode(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <header className='px-5 py-4 max-w-lg mx-auto'>
        <h1 className='text-4xl text-slate-700 font-medium'>Todoist</h1>
      </header>
      <main className='px-5 mt-5 max-w-lg mx-auto'>
        <form className='flex flex-col items-center sm:flex-row gap-2'>
          <input
            placeholder='What are you doing today?'
            className='p-2 rounded-lg border border-slate-100 w-full'
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />

          {isEditMode ? (
            <button
              className='bg-yellow-500 rounded-lg px-2.5 py-2 text-sm text-white w-[100px]'
              onClick={updateTodo}
              type='submit'
            >
              Update
            </button>
          ) : (
            <button
              className='bg-blue-500 rounded-lg px-2.5 py-2 text-sm text-white w-[100px]'
              type='submit'
              onClick={createTodo}
            >
              Add todo
            </button>
          )}
        </form>
        {formError.isError && (
          <span className='text-red-400 text-xs'>{formError.errorMessage}</span>
        )}

        {!loadingTodos && todos.length === 0 && (
          <p className='text-center text-slate-500'>
            No todos yet. They'll appear here once you add them.
          </p>
        )}

        <section className='mt-5'>
          {loadingTodos ? (
            <section className='flex flex-col gap-2'>
              <TodoLoader />
              <TodoLoader />
              <TodoLoader />
            </section>
          ) : (
            <>
              {todos.map(({ title, id, created_at }) => {
                return (
                  <TodoList
                    title={title}
                    id={id}
                    created_at={created_at}
                    key={`todo-list-${id}`}
                    handleDelete={handleDelete}
                    handleEditMode={handleEditMode}
                  />
                );
              })}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
