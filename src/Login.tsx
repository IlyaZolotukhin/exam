import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import s from "./Login.module.css"

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
            <div className={s.googleBtn}>
                <GoogleLogin
                    ux_mode={'popup'}
                    useOneTap={true}
                    theme="filled_black"
                    size="large"
                    text="continue_with"
                    onSuccess={credentialResponse => {
                        if (credentialResponse && credentialResponse.credential) {
                            const decoded = jwtDecode<DataJWT>(credentialResponse.credential);
                            /*console.log(decoded.name);*/
                            onLogin && onLogin({ username: decoded.name });
                            navigate('/profile' ) ;
                        }
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
        </div>
    );
}