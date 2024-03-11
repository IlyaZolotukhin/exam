import {useNavigate} from "react-router-dom";
import {useState} from "react";

export type User = {
    username: string;
};

export type Data = {
    username: string;
    password: string;
};
export const Login = ({ onLogin }: { onLogin: (user: User) => void }) => {
    const [data, setData] = useState<Data>({ username: '', password: '' });
    const navigate = useNavigate();

    function handleLogin() {
        if (data.username === 'admin' && data.password === '123') {
            onLogin && onLogin({ username: data.username });
            navigate('/profile');
        }
    }

    return (
        <div style={{ padding: 10 }}>
            <br />
            <span>Username:</span><br />
            <input
                type="text"
                onChange={(e) => setData({ ...data, username: e.target.value })} /><br />
            <span>Password:</span><br />
            <input
                type="password"
                onChange={(e) => setData({ ...data, password: e.target.value })} /><br /><br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}