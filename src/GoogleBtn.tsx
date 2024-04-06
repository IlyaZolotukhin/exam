import React from "react";
import {GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {User} from "./Login";

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
export type BtnProps = {
    onLogin: (user: User) => void
};
export const GoogleBtn = ({onLogin}: BtnProps) => {
    const navigate = useNavigate();

    return (
        <Button>
            <p>continue with </p>
            <GoogleLogin
                type={'icon'}
                ux_mode={'popup'}
                useOneTap={true}
                theme="filled_black"
                size="small"
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
        </Button>
    )
}

const Button = styled.div`
    display: flex;
    gap:10px;
    align-items: center;
    padding: 10px;
    height: 46px;`
;