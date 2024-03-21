import {Navigate, useSearchParams} from "react-router-dom";
import { User } from "./Login";
import React, {useEffect, useState} from "react";
import axios from "axios";

interface ProfileProps {
    user: User | null;
}

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/')
            .then(response => setTodos(response.data))
            .catch(error => console.error(error));
    }, []);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div style={{padding: 20}}>
            <h2>Stats View</h2>
            <b>Congratulations {user.username}, you are logged in!</b>
            {todos.map(todo => (
                <div key={todo.id}>{todo.title}</div>
            ))}
        </div>
    );
}