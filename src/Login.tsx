type LoginProps = {
    handleLogin: ()=>void
}
export const Login = ({handleLogin}:LoginProps) => {
return(
    <div>
        Login:
        <button onClick={handleLogin}>Login</button>
    </div>
)
}