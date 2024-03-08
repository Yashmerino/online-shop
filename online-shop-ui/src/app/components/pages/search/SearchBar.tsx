import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchBox } from 'react-instantsearch';
import { useAppSelector } from '../../../hooks';
import { getTranslation } from '../../../../i18n/i18n';

function SearchBar(props: any) {
    const {
        query,
        refine,
    } = useSearchBox(props);

    const lang = useAppSelector(state => state.lang.lang);

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "70%", margin: "auto", mt: "2.5%" }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={getTranslation(lang, "search")}
                inputProps={{ 'aria-label': getTranslation(lang, "search") }}
                value={query}
                onChange={(e) => refine(e.currentTarget.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label={getTranslation(lang, "search")}>
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
    );
}

export default SearchBar;