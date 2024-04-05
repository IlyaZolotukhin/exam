import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Login, User} from "./Login";
import {Home} from "./Home";
import {Profile} from "./Profile";
import {NoMatch} from "./NoMatch";
import {About} from "./About";
import {Post} from "./Post";
import {PostLists} from "./PostLists";
import {Posts} from "./Posts";
import {googleLogout} from "@react-oauth/google";
import {Card} from "./Card";
import styled from "styled-components";

export const AppLayout = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation()
    const currentPath = location.pathname

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }
    const logOut = () => {
        setUser(null);
        googleLogout();
        navigate("/");
        toggleMenu();
    }

    return (
        <>
            {isMenuOpen && <Background onClick={toggleMenu}/>}

                <Nav>
                    <BurgerIcon onClick={toggleMenu}>
                        &#9776;
                    </BurgerIcon>
                    {isMenuOpen ? <DropdownMenu>
                            <StyledLink onClick={toggleMenu}
                                        style={currentPath === "/" ? {color: 'blueviolet'} : {color: 'black'}} to="/">
                                Home
                            </StyledLink>
                            <StyledLink onClick={toggleMenu}
                                        style={currentPath === "/about" ? {color: 'blueviolet'} : {color: 'black'}}
                                        to="/about">
                                About
                            </StyledLink>

                            {user &&
                                <StyledLink onClick={toggleMenu}
                                            style={currentPath === "/posts" ? {color: 'blueviolet'} : {color: 'black'}}
                                            to="/posts">
                                    Posts
                                </StyledLink>}
                            {user && <StyledLink onClick={toggleMenu}
                                                 style={currentPath === "/profile" ? {color: 'blueviolet'} : {color: 'black'}}
                                                 to="/profile">
                                Profile
                            </StyledLink>}
                            {!user &&
                                <StyledLink onClick={toggleMenu}
                                            style={currentPath === "/login" ? {color: 'blueviolet'} : {color: 'black'}}
                                            to="/login">
                                    Login
                                </StyledLink>}
                            {user && <SpanNav onClick={logOut}>
                                Logout
                            </SpanNav>}
                        </DropdownMenu> :
                        <Menu>
                            <StyledLink style={currentPath === "/" ? {color: 'blueviolet'} : {color: 'black'}}
                                              to="/">
                            Home
                        </StyledLink>
                            <StyledLink style={currentPath === "/about" ? {color: 'blueviolet'} : {color: 'black'}}
                                        to="/about">
                                About
                            </StyledLink>
                            <span> | </span>
                            {user &&
                                <StyledLink style={currentPath === "/posts" ? {color: 'blueviolet'} : {color: 'black'}}
                                            to="/posts">
                                    Posts
                                </StyledLink>}
                            {user && <StyledLink
                                style={currentPath === "/profile" ? {color: 'blueviolet'} : {color: 'black'}}
                                to="/profile">
                                Profile
                            </StyledLink>}
                            {!user &&
                                <StyledLink style={currentPath === "/login" ? {color: 'blueviolet'} : {color: 'black'}}
                                            to="/login">
                                    Login
                                </StyledLink>}
                            {user && <SpanNav onClick={logOut}>
                                Logout
                            </SpanNav>}</Menu>}
                    <hr/>
                </Nav>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/photo/:id" element={<Card/>}/>
                <Route path="/posts" element={<Posts/>}>
                    <Route index element={<PostLists user={user}/>}/>
                    <Route path=":slug" element={<Post/>}/>
                </Route>
                <Route path="/about" element={<About/>}/>
                <Route path="/login" element={<Login onLogin={setUser}/>}/>
                <Route path="/profile" element={<Profile user={user}/>}/>
                <Route path="*" element={<NoMatch/>}/>
            </Routes>
        </>
    );
}

const Nav = styled.nav`
    font-weight: bold;
    margin-bottom: 20px;
    padding: 5px;
    position: sticky;
    top: 0;
    background-color: azure;
    @media screen and (width <= 600px) {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }`
;
const SpanNav = styled.span`
    cursor: pointer`
;
const BurgerIcon = styled.div`
    display: none;
    @media screen and (width <= 600px) {
        font-size: 25px;
        font-weight: bold;
        display: flex;
        margin-left: 10px;
        cursor: pointer;
    }`
;

const Background = styled.div`

    @media screen and (width <= 600px) {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        backdrop-filter: blur(2px);
    }`
;

const DropdownMenu = styled.div`

    @media screen and (width <= 600px) {
        width: 50%;
        height: 550px;
        display: flex;
        position: absolute;
        background-color: cornflowerblue;
        opacity: 0.9;
        flex-direction: column;
        margin-top: 30px;
        padding: 10px 0 30px 10px;
        gap: 20px;
        border: 1px solid blue;
        border-radius: 5px;
    }`
;

const Menu = styled.div`

    @media screen and (width <= 600px) {
        display: none;
    }`
;

export const StyledLink = styled(Link)`
    padding-right: 10px;
    text-decoration: none;
    color: inherit;`
;
