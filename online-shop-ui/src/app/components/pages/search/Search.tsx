import algoliasearch from 'algoliasearch';
import * as React from 'react'
import { InstantSearch } from 'react-instantsearch';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } from '../../../../env-config';
import { Box, Paper } from "@mui/material";
import SearchBar from './SearchBar';
import SearchHits from './SearchHits';
import { useEffect } from 'react';

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

function Search() {
    useEffect(() => {
        // Force clear the InstantSearch cache on component mount
        searchClient.clearCache();
        // Fetch fresh results
        searchClient.search([{
            indexName: ALGOLIA_INDEX_NAME,
            params: {
                hitsPerPage: 20,
                distinct: true,
                page: 0
            }
        }]);
    }, []);
    return (
        <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
                <SearchBar />
                <Paper 
                    elevation={0}
                    sx={{ 
                        width: '100%',
                        borderRadius: 2,
                        backgroundColor: 'background.paper',
                        p: 3,
                        minHeight: '60vh'
                    }}
                >
                    <SearchHits />
                </Paper>
            </Box>
        </InstantSearch>
    );
}

export default Search;