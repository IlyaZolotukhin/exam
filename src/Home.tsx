import {useEffect, useState} from "react";
import {URLSearchParamsInit, useSearchParams} from "react-router-dom";
import axios from "axios";

type Photo = {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

export const Home = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false)

    const handleSearch = (page: string, perPage: string) => {
        const params: URLSearchParamsInit = { page, perPage };
        setSearchParams(params);
    };

    useEffect(() => {
        setLoading(true)
        axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${perPage}`)
    .then(response => setPhotos(response.data))
            .catch(error => console.error(error));
        setLoading(false)
        handleSearch(page.toString(), perPage.toString());
    }, [page, perPage]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const newPage = parseInt(params.get('page') || '1');
        const newPerPage = parseInt(params.get('perPage') || '10');
if(newPage !== page || newPerPage !== perPage){
    setPage(newPage);
    setPerPage(newPerPage);
}

    }, [searchParams]);
    console.log(loading)
    return (

        <div style={{ padding: 20 }}>
            {loading ? <div id={'hw10-loading'}>Loading...</div>
                :<div></div>}
             {photos.map(photo => (
                <div key={photo.id} style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
                    {photo.id} - {photo.title} <img alt={photo.title} src={photo.url} />
                </div>
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