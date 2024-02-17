/*
 * MIT License
 *
 * Copyright (c) 2023 Artiom Bozieac
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material';
import { getTranslation } from '../../../i18n/i18n';
import { useAppSelector } from '../../hooks';

const Copyright = (props: any) => {
    const lang = useAppSelector(state => state.lang.lang);
    const theme = useTheme();

    return (
        <Grid container direction="row" style={{ marginTop: "50px" }} sx={{ mt: "4%", p: "1%", bottom: 0, position: "absolute" }} bgcolor={theme.palette.mode === "light" ? "#1976d2" : "#272727"} data-testid="footer">
            <Grid item width="34%" ml="16%">
                <Typography variant="h5" color="#FFF" align="left" sx={{ lineHeight: "1", fontWeight: 600 }}>{getTranslation(lang, "online_shop")}</Typography>
                <Typography variant="subtitle2" color="#FFF" align="left" sx={{ lineHeight: "1" }} marginTop="4%">example@shop.com</Typography>
                <Typography variant="subtitle2" color="#FFF" align="left" sx={{ lineHeight: "1" }}>+40 336 772 413</Typography>
                <Typography variant="subtitle2" color="#FFF" align="left" sx={{ lineHeight: "1" }} marginTop="2%">Strada Alexandru Ioan Cuza 13, Craiova 200585</Typography>
            </Grid>
            <Grid item width="34%" mr="16%">
                <Typography variant="subtitle2" color="#FFF" align="right" sx={{ lineHeight: "1", textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum iaculis lacus sit amet ipsum finibus blandit. Nam ac nibh et ante varius fermentum sed et turpis. Sed nibh felis, accumsan vel erat in, facilisis vulputate velit. Phasellus ac iaculis eros. Praesent porttitor neque non augue porta facilisis. Nunc hendrerit massa dui, non auctor enim placerat vitae. Aliquam at diam neque.
                    Nam vitae porta nunc. Quisque a nisi nec felis sagittis condimentum. Ut mollis lectus magna, eget maximus turpis rutrum venenatis, odit rutrum.</Typography>
                <Typography variant="subtitle2" color="#FFF" align="right" sx={{ lineHeight: "1" }} marginTop="4%">© 2023</Typography>
            </Grid>
        </Grid>
    );
}

export default Copyright;