import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchTodos, toggleTodo, removeTodo } from './todosSlice';

const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);
    const status = useSelector((state: RootState) => state.todos.status);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTodos());
        }
    }, [status, dispatch]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Failed to load todos.</p>}
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className="mb-2 flex items-center">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => dispatch(toggleTodo(todo.id))}
                            className="mr-2"
                        />
                        <span className={`flex-1 ${todo.completed ? 'line-through' : ''}`}>{todo.title}</span>
                        <button
                            onClick={() => dispatch(removeTodo(todo.id))}
                            className="ml-2 text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;