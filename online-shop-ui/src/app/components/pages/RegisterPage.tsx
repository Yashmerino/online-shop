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

import * as React from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';

import Copyright from '../footer/Copyright';
import UserInputFields from './UserInputFields';
import * as AuthRequest from '../../api/AuthRequest';

const RegisterPage = () => {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username')?.toString();
        const password = data.get('password')?.toString();
        const role = data.get('role')?.toString();
        const email = data.get('email')?.toString();

        const response = await AuthRequest.register(role || "", email || "", username || "", password || "");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Grid container>
                <Grid item>
                    <UserInputFields title="Sign Up" buttonText="Sign Up" handleSubmit={handleSubmit} isEmailAndRoleMandatory={true} />
                </Grid>
                <Grid item>
                    <Link component={RouterLink} to={'/login'} variant="body2">
                        {"Have already an account? Log in"}
                    </Link>
                </Grid>
            </Grid>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

export default RegisterPage;