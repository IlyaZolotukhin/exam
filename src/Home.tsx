import React, {useEffect, useState} from "react";

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export const Home = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(json => setTodos(json));
    }, []);

    return (
        <div style={{ padding: 20 }}>
            {todos.map(todo => (
                <div key={todo.id}>{todo.title}</div>
            ))}
        </div>
    );
}