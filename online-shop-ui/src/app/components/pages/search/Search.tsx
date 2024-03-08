import algoliasearch from 'algoliasearch';
import * as React from 'react'
import { InstantSearch } from 'react-instantsearch';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } from '../../../../env-config';;
import { Paper } from "@mui/material";
import SearchBar from './SearchBar';
import SearchHits from './SearchHits';

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

function Search() {
    return (
        <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
            <SearchBar />
            {/* @ts-ignore*/}
            <Paper square elevation={3} sx={{ width: "70%", pl: "1.5%", pr: "1.5%", margin: "auto", mt: "2.5%", display: "flex" }}>
                <SearchHits style={{ width: "100%" }} />
            </Paper>
        </InstantSearch>
    );
}

export default Search;