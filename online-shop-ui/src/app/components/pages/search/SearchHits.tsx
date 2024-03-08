import { Box, Typography } from '@mui/material';
import React from 'react';
import { useHits } from 'react-instantsearch';
import SearchHit from './SearchHit';
import { useAppSelector } from '../../../hooks';
import { getTranslation } from '../../../../i18n/i18n';

function SearchHits(props: any) {
    const { hits } = useHits(props);
    const lang = useAppSelector(state => state.lang.lang);

    return (<Box sx={{ width: "100%", pb: "1.5%", display: "flex", overflow: "hidden", flexDirection: "column" }}>
        {hits.map(hit => {
            return (<div style={{ marginTop: "2%" }} key={hit.objectID}><SearchHit key={hit.objectID} objectID={parseInt(hit.objectID)} name={String(hit.name)} price={Number(hit.price)} /></div>)
        })}
        {hits.length <= 0 &&
            <Typography variant="h4" sx={{ margin: "auto", mt: "5%", mb: "3.5%" }}>{getTranslation(lang, "no_products_found")}</Typography>
        }
    </Box>);
}

export default SearchHits;