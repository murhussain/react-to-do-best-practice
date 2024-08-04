import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../../app/axios.ts";
import axios from 'axios';
import { Todo } from "../../types/todos/todosInterfaces.ts";

export interface TodosState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodosState = {
    todos: [],
    loading: false,
    error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos',
    async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get<Todo[]>('/todos');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue('An unknown error occurred');
        }
    }
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
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;

export default todosSlice.reducer;