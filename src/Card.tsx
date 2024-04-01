import {useLocation, useParams} from "react-router-dom";
import styled from "styled-components";

export const Card = () => {
    const { id } = useParams();
    const title = new URLSearchParams(useLocation().search).get('title') as string;
    const url = new URLSearchParams(useLocation().search).get('url') as string;

    return (
        <Container>
            <H1>Card</H1>
            <Img src={url} alt={title}/>
            <p>ID: {id}</p>
            <H2>{title}</H2>
        </Container>
    );
};

const Container = styled.div`
    width: 50%;
    margin: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center`
;
const H1 = styled.h1`
    margin: 0;`
;
const H2 = styled.h2`
    width: 300px;
    text-align: justify;
    hyphens: auto;`
;
const Img = styled.img`
width: 300px;`
;