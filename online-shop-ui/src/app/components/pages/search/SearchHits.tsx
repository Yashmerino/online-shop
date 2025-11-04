import { Box, Typography } from '@mui/material';
import React from 'react';
import { useHits } from 'react-instantsearch';
import SearchHit from './SearchHit';
import { useAppSelector } from '../../../hooks';
import { getTranslation } from '../../../../i18n/i18n';

function SearchHits(props: any) {
    const { hits } = useHits(props);
    const lang = useAppSelector(state => state.lang.lang);

    return (
        <Box sx={{ 
            width: "100%",
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(auto-fill, minmax(300px, 1fr))'
            },
            py: 2
        }}>
            {hits.map(hit => (
                <SearchHit 
                    key={hit.objectID} 
                    objectID={parseInt(hit.objectID)} 
                    name={String(hit.name)} 
                    price={Number(hit.price)} 
                />
            ))}
            {hits.length <= 0 && (
                <Box sx={{ 
                    gridColumn: '1/-1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                    gap: 2
                }}>
                    <Typography 
                        variant="h5" 
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                    >
                        {getTranslation(lang, "no_products_found")}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

export default SearchHits;