import { Navigate } from "react-router-dom";
import { User } from "./Login";

interface ProfileProps {
    user: User | null;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Stats View</h2>
            <p>Congratulations {user.username}, you are logged in!</p>
            <img src="https://img.freepik.com/free-photo/cute-kitten-sitting-outdoors-looking-at-camera-surrounded-by-snow-generated-by-artificial-intelligence_188544-84910.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1710097200&semt=ais" alt="page"/>
        </div>
    );
}