import * as React from 'react';
import { Container } from '@mui/material';
import Header from '../../Header';
import Search from './Search';
import Copyright from "../../footer/Copyright";

const SearchPage = () => {
    return (
        <Container component="main" maxWidth={false} id="search-container" sx={{ height: "100vh" }} disableGutters>
            <Header />
            <Search />
            <Copyright />
        </Container>
    );
}

export default SearchPage;