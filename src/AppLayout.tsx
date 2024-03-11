import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Login, User} from "./Login";
import {Home} from "./Home";
import {Profile} from "./Profile";
import {NoMatch} from "./NoMatch";
import {About} from "./About";
import {Post} from "./Post";
import {PostLists} from "./PostLists";
import {Posts} from "./Posts";

export const AppLayout = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const logOut = () => {
        setUser(null);
        navigate("/");
    }

    return (
        <>
            <nav style={{ margin: 10 }}>
                <Link to="/" style={{ padding: 5 }}>
                    Home
                </Link>
                <Link to="/posts" style={{ padding: 5 }}>
                    Posts
                </Link>
                <Link to="/about" style={{ padding: 5 }}>
                    About
                </Link>
                <span> | </span>
                {user && <Link to="/profile" style={{ padding: 5 }}>
                    Profile
                </Link>}
                {!user && <Link to="/login" style={{ padding: 5 }}>
                    Login
                </Link>}
                {user && <span onClick={logOut} style={{ padding: 5, cursor: 'pointer' }}>
          Logout
        </span>}
            </nav>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/posts" element={<Posts />}>
                    <Route index element={<PostLists />} />
                    <Route path=":slug" element={<Post />} />
                </Route>
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login onLogin={setUser} />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </>
    );
}