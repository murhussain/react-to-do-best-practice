import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchTodos, toggleTodo, removeTodo } from './todosSlice';

const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);
    const loading = useSelector((state: RootState) => state.todos.loading);
    const error = useSelector((state: RootState) => state.todos.error);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!loading && !error && todos.length === 0) {
            dispatch(fetchTodos());
        }
    }, [loading, error, todos.length, dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Failed to load todos: {error}</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
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