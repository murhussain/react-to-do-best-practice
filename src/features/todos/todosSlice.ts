import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {Todo} from "../../types/todos/todosInterfaces.ts";

export interface TodosState {
    todos: Todo[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TodosState = {
    todos: [],
    status: 'idle',
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get<Todo[]>('/todos');
    return response.data;
});

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
        },

        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },

        removeTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'idle';
                state.todos = action.payload;
            })

            .addCase(fetchTodos.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;

export default todosSlice.reducer;