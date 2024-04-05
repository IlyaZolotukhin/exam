import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import styled from "styled-components";

export type User = {
    username: string;
};

export type Data = {
    username: string;
    password: string;
};

type DataJWT = {
    iss: string
    azp: string
    aud: string
    sub: string
    email: string
    email_verified: boolean
    nbf: number
    name: string
    picture: string
    given_name: string
    family_name: string
    locale: string
    iat: number
    exp: number
    jti: string
}
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
            <GoogleBtn>
                <GoogleLogin
                    ux_mode={'popup'}
                    useOneTap={true}
                    theme="filled_black"
                    size="large"
                    text="continue_with"
                    onSuccess={credentialResponse => {
                        if (credentialResponse && credentialResponse.credential) {
                            const decoded = jwtDecode<DataJWT>(credentialResponse.credential);
                            //console.log(decoded.name);
                            onLogin && onLogin({username: decoded.name});
                            navigate('/profile');
                        }
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </GoogleBtn>
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
    border: 1px solid black;
    border-radius: 5px;
    @media screen and (width <= 1024px) {
        width: 80%;
    }`
;
const GoogleBtn = styled.div`
            padding: 10px;
            height: 46px;
    `
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