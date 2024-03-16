import React, {useEffect, useState} from "react";
import axios from "axios";

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export const Home = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/')
            .then(response => setTodos(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div style={{ padding: 20 }}>
            {todos.map(todo => (
                <div key={todo.id}>{todo.title}</div>
            ))}
        </div>
    );
}