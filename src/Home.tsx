import React, {useEffect, useState} from "react";
import {URLSearchParamsInit, useSearchParams} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import {log} from "node:util";

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
    const [sortByIdAsc, setSortByIdAsc] = useState<boolean>(false);
    const [sortByTitleAsc, setSortByTitleAsc] = useState<boolean>(false);
    const handleSearch = (page: string, perPage: string) => {
        const params: URLSearchParamsInit = {page, perPage};
        setSearchParams(params);
    };

    useEffect(() => {
        setLoading(true)
        axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${perPage}`)
            .then(response => {
                setPhotos(response.data);
               //handleSearch(page.toString(), perPage.toString());
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });

    }, [page, perPage]);

    useEffect(() => {
        const param = new URLSearchParams(searchParams);
        const newPage = parseInt(param.get('page') || '1');
        const newPerPage = parseInt(param.get('perPage') || '5');
        if (newPage !== page || newPerPage !== perPage) {
            setPage(newPage);
            setPerPage(newPerPage);
        }
    }, [page, perPage, searchParams]);

    const handlePrevPage = () => {
        setPage(prevPage => prevPage - 1)
        handleSearch((page-1).toString(), perPage.toString());
    };

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1)
        handleSearch((page+1).toString(), perPage.toString());
    };

    const handleChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(parseInt(e.target.value))
        handleSearch(page.toString(), (e.target.value).toString());
        setSortByIdAsc(false)
        setSortByTitleAsc(false)
    };

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
        <Container>
            {loading ? <div>Loading...</div>
                : (
                    <table>
                        <thead>
                        <tr>
                            <TD onClick={handleSortById}>Photo Number{sortByIdAsc ? ' ▲' : ' ▼'}</TD>
                            <TD onClick={handleSortByTitle}>Photo Title{sortByTitleAsc ? ' ▲' : ' ▼'}</TD>
                            <th>Photo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {photos.map(photo => (
                            <tr key={photo.id}>
                                <td>{photo.id}</td>
                                <td>{photo.title}</td>
                                <td><Img alt={photo.title} src={photo.url}/></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

            <Pagination>
                <Button disabled={page === 1} onClick={handlePrevPage}>Previous Page</Button>
                {page}
                <Button onClick={handleNextPage}>Next Page</Button>
                <select value={perPage} onChange={handleChangePerPage}>
                    <option value="3">3 per page</option>
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                </select>

            </Pagination>
        </Container>
    );
}

const Container = styled.div`
    width: 50%;
    margin: auto;
    padding: 20px;`
;
const TD = styled.th`
cursor: pointer`
;
const Img = styled.img`
width: 100px`
;
const Pagination = styled.div`
    width: 50%;
    margin: auto;
    padding: 40px;`
;
const Button = styled.button`
    margin: 20px;`
;