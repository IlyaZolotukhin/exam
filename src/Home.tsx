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
    const [perPage, setPerPage] = useState<number>(5);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false)
    const [sortByIdAsc, setSortByIdAsc] = useState<boolean>(true);
    const [sortByTitleAsc, setSortByTitleAsc] = useState<boolean>(true);
    const handleSearch = (page: string, perPage: string) => {
        const params: URLSearchParamsInit = { page, perPage };
        setSearchParams(params);
    };

    useEffect(() => {
        setLoading(true)
        axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${perPage}`)
    .then(response => {
            setPhotos(response.data);
        handleSearch(page.toString(), perPage.toString());
        setLoading(false);
        })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });

    }, [page, perPage]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const newPage = parseInt(params.get('page') || '1');
        const newPerPage = parseInt(params.get('perPage') || '10');
if(newPage !== page || newPerPage !== perPage){
    setPage(newPage);
    setPerPage(newPerPage);
}
    }, [searchParams, page, perPage]);

    const handleSortById = () => {
        setSortByIdAsc(prev => !prev);
        setPhotos(prevPhotos => prevPhotos.slice().sort((a, b) => (sortByIdAsc ? a.id - b.id : b.id - a.id)));
    };

    const handleSortByTitle = () => {
        setSortByTitleAsc(prev => !prev);
        setPhotos(prevPhotos =>
            prevPhotos.slice().sort((a, b) =>
                sortByTitleAsc
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            )
        );
    };

    return (
        <div style={{ padding: 20 }}>
            {loading ? <div>Loading...</div>
                :(
                    <table>
                        <thead>
                        <tr>
                            <th onClick={handleSortById}>Photo Number{sortByIdAsc? ' ▲' : ' ▼'}</th>
                            <th onClick={handleSortByTitle}>Photo Title{sortByTitleAsc? ' ▲' : ' ▼'}</th>
                            <th>Photo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {photos.map(photo => (
                            <tr key={photo.id}>
                                <td>{photo.id}</td>
                                <td>{photo.title}</td>
                                <td><img alt={photo.title} src={photo.url} style={{ width: 100 }} /></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

            <div>
                <button onClick={() => setPage(prevPage => prevPage - 1)}>Previous Page</button>
                <button onClick={() => setPage(prevPage => prevPage + 1)}>Next Page</button>
                <select value={perPage} onChange={(e) => setPerPage(parseInt(e.target.value))}>
                    <option value="3">3 per page</option>
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                </select>

            </div>
        </div>
    );
}