import React, {useEffect, useState} from "react";
import {Link, URLSearchParamsInit, useSearchParams} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import {StyledLink} from "./AppLayout";


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
    const [searchText, setSearchText] = useState<string>('');

    const handleSearch = (page: string, perPage: string, searchText: string) => {
        const params: URLSearchParamsInit = {page, perPage, searchText};
        setSearchParams(params);
    };

    useEffect(() => {
        const param = new URLSearchParams(searchParams);
        const newPage = parseInt(param.get('page') || '1');
        const newPerPage = parseInt(param.get('perPage') || '5');
        const newSearchText = param.get('searchText') || '';
        setLoading(true)
        axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${newPage}&_limit=${newPerPage}&q=${newSearchText}`)
            .then(response => {
                setPhotos(response.data);
                //handleSearch(page.toString(), perPage.toString());
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });

    }, [page, perPage, searchText]);

    useEffect(() => {
        const param = new URLSearchParams(searchParams);
        const newPage = parseInt(param.get('page') || '1');
        const newPerPage = parseInt(param.get('perPage') || '5');
        const newSearchText = param.get('searchText') || '';
        if (newPage !== page || newPerPage !== perPage) {
            setPage(newPage);
            setPerPage(newPerPage);
            setSearchText(newSearchText)
        }
    }, [page, perPage, searchParams, searchText]);

    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        handleSearch((page).toString(), perPage.toString(), e.target.value);
    };

    const handlePrevPage = () => {
        setPage(prevPage => prevPage - 1)
        handleSearch((page - 1).toString(), perPage.toString(), searchText);
    };

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1)
        handleSearch((page + 1).toString(), perPage.toString(), searchText);
    };

    const handleChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(parseInt(e.target.value))
        handleSearch(page.toString(), (e.target.value).toString(), searchText);
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
            <H1>Home</H1>
            <Input type="text" value={searchText} onChange={handleSearchTextChange} placeholder="Search by title"/>

            {loading ? <div>Loading...</div>
                : (
                    <table>
                        <THead>
                            <tr>
                                <TD onClick={handleSortById}>Photo Number{sortByIdAsc ? ' ▲' : ' ▼'}</TD>
                                <TD onClick={handleSortByTitle}>Photo Title{sortByTitleAsc ? ' ▲' : ' ▼'}</TD>
                                <th>Photo</th>
                            </tr>
                        </THead>
                        <tbody>
                        {photos.map(photo => (
                            <TR key={photo.id}>
                                <TDid>{photo.id}</TDid>
                                <td>
                                    <StyledLink to={`/photo/${photo.id}?title=${photo.title}&url=${photo.url}`}>
                                        {photo.title}
                                    </StyledLink>
                                </td>
                                <td><Img alt={photo.title} src={photo.url}/></td>
                            </TR>
                        ))}
                        </tbody>
                    </table>
                )}
            {/*<div>{searchText && 'please enter correct text'}</div>*/}
            <Pagination>
                <Button disabled={page === 1} onClick={handlePrevPage}>Back</Button>
                {page}
                <Button onClick={handleNextPage}>Next</Button>
                <Select value={perPage} onChange={handleChangePerPage}>
                    <option value="3">3 items</option>
                    <option value="5">5 items</option>
                    <option value="10">10 items</option>
                </Select>

            </Pagination>
        </Container>
    );
}

export const Container = styled.div`
    width: 50%;
    margin: auto;
    padding: 20px;
    @media screen and (width <= 1024px) {
        padding: 0;
        width: 80%;
    }`
;
const H1 = styled.h1`
    margin: 0;`
;
export const Input = styled.input`
    width: 50%;
    margin: 20px auto;
    padding: 5px;
    border: 2px solid gray;
    border-radius: 5px;
    @media screen and (width <= 1024px) {
        width: 100%;
    }`
;
const TD = styled.th`
    cursor: pointer;`
;
const THead = styled.thead`
    @media screen and (width <= 600px) {
        display: none;
    }`
;
const TDid = styled.td`
    @media screen and (width <= 600px) {
        display: none;
    }`
;
const TR = styled.tr`
    @media screen and (width <= 600px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }`
;

const Img = styled.img`
    width: 100px`
;
const Pagination = styled.div`
    width: 50%;
    margin: auto;
    padding: 40px;
    @media screen and (width <= 1024px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0;
        margin: 0;
    }`
;
export const Button = styled.button`
    margin: 20px;
    padding: 5px;
    border: 2px solid gray;
    border-radius: 5px;
    @media screen and (width <= 1024px) {
        margin: 5px;
    }`
;
const Select = styled.select`
    margin: 20px;
    padding: 5px;
    border: 2px solid gray;
    border-radius: 5px;
    @media screen and (width <= 1024px) {
        margin: 5px;
    }`
;
