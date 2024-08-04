import React from 'react';
import TodoList from './features/todos/TodoList';

const App: React.FC = () => {
    return (
        <div className="container mx-auto">
            <TodoList />
        </div>
    );
};

export default App;