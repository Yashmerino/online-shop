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
import './../main.scss';

import { Link } from 'react-router-dom';
import Main from './Main';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppSelector } from './hooks';

function App() {
    const theme = useAppSelector(state => state.theme.theme);

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <div>
            <ul>
                <li><Link to='/login'>Login page</Link></li>
                <li><Link to='/register'>Register page</Link></li>
                <li><Link to='/products'>Products page</Link></li>
                <li><Link to='/cart'>My Cart page</Link></li>
                <li><Link to='/product/add'>Add Product page</Link></li>
                <li><Link to='/profile/products'>My Products page</Link></li>
                <li><Link to='/profile'>My Profile page</Link></li>
            </ul>
            <hr />
            <ThemeProvider theme={theme ? darkTheme : lightTheme}>
                <CssBaseline />
                <Main />
            </ThemeProvider>
        </div>
    );
}

export default App;
