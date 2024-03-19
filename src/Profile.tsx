import {Navigate, useSearchParams} from "react-router-dom";
import { User } from "./Login";
import React, {useEffect, useState} from "react";
import axios from "axios";

interface ProfileProps {
    user: User | null;
}

type Photo = {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${perPage}`)
            .then(response => setPhotos(response.data))

            .catch(error => console.error(error));
    }, [page, perPage]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div style={{padding: 20}}>
            <h2>Stats View</h2>
            <b>Congratulations {user.username}, you are logged in!</b>


            {photos.map(photo => (
                <div key={photo.id} style={{display: 'flex', flexDirection: 'column', width: '200px'}}>

                    {photo.id} - {photo.title} <img alt={photo.title} src={photo.url}/></div>
            ))}
            <div>
                <button onClick={() => setPage(prevPage => prevPage - 1)}>Previous Page</button>
                <button onClick={() => setPage(prevPage => prevPage + 1)}>Next Page</button>
                <select value={perPage} onChange={(e) => setPerPage(parseInt(e.target.value))}>
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                    <option value="20">20 per page</option>
                </select>
            </div>

        </div>
    );
}