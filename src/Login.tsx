import {useNavigate} from "react-router-dom";
import {useState} from "react";
import styled from "styled-components";
import {GoogleBtn} from "./GoogleBtn";

export type User = {
    username: string;
};

export type Data = {
    username: string;
    password: string;
};


export const Login = ({onLogin}: { onLogin: (user: User) => void }) => {
    const [data, setData] = useState<Data>({username: '', password: ''});
    const navigate = useNavigate();

    function handleLogin() {
        if (data.username === 'admin' && data.password === '123') {
            onLogin && onLogin({username: data.username});
            navigate('/profile');
        }
    }

    return (
        <Container>
            <h1>Login</h1>
            <span>Username:</span>
            <LoginInput
                type="text"
                onChange={(e) => setData({...data, username: e.target.value})}/>
            <span>Password:</span>
            <LoginInput
                type="password"
                onChange={(e) => setData({...data, password: e.target.value})}/>
            <LoginButton onClick={handleLogin}>Login</LoginButton>
            <GoogleBtn onLogin={onLogin}/>
        </Container>
    );
}

const Container = styled.div`
    width: 20%;
    margin: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border: 2px solid gray;
    border-radius: 5px;
    @media screen and (width <= 1024px) {
        width: 80%;
    }`
;

const LoginInput = styled.input`
    width: 90%;
    padding: 5px;
    border: 2px solid gray;
    border-radius: 5px;`
;
const LoginButton = styled.button`
    width: 50%;
    margin: 10px;
    padding: 5px;
    border: 2px solid gray;
    border-radius: 5px;`
;