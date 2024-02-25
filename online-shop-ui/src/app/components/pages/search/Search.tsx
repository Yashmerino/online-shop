import algoliasearch from 'algoliasearch';
import * as React from 'react'
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } from '../../../../env-config';
import ProductCard from '../products/ProductCard';
import { Grid } from "@mui/material";

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

function Hit(hit: any) {
    return <ProductCard key={hit.hit.objectID} id={parseInt(hit.hit.objectID)} title={hit.hit.name} price={hit.hit.price} categories={hit.hit.categories} description={hit.hit.description} />
}

function Search() {
    return (
        <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
            <SearchBox style={{ width: "75%", margin: "5% auto", }} />
            {/* @ts-ignore*/}
            <Grid container justifyContent="center" alignItems="center" columnGap={2} sx={{ mb: "5%" }}>
                <Hits hitComponent={Hit} style={{ display: "flex" }} />
            </Grid>
        </InstantSearch>
    );
}

export default Search;