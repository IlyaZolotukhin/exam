import {Navigate} from "react-router-dom";
import {User} from "./Login";
import React from "react";
import {Container} from "./Home";

interface ProfileProps {
    user: User | null;
}

export const Profile: React.FC<ProfileProps> = ({user}) => {
    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    return (
        <Container>
            <h2>Stats View</h2>
            <p>Congratulations {user.username}, you are logged in!</p>
        </Container>
    );
}