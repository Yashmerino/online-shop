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
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { addProduct } from '../../../api/ProductRequest';
import Alert from '@mui/material/Alert';

import Header from '../../Header';
import Copyright from '../../footer/Copyright';

import { useAppSelector } from '../../../hooks'
import { Stack, Typography } from '@mui/material';

const currencies = [
    {
        value: 'EUR',
        label: '€',
    },
];

const AddProductPage = () => {
    const roles = useAppSelector(state => state.roles);
    const jwt = useAppSelector(state => state.jwt);

    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState(0);

    const [error, setError] = React.useState([]);
    const [isSuccess, setSuccess] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSuccess(false);
        setError([]);

        const response = await addProduct(jwt.token, name, price);
        if (response.fieldErrors) {
            setError(response.fieldErrors);
        } else {
            setSuccess(true);
        }
    }

    return (
        <Container component="main" maxWidth={false} id="main-container" disableGutters>
            <Header />
            {// @ts-ignore 
                roles.roles.roles[0].name == "SELLER"
                    ? (<Box
                        onSubmit={event => handleSubmit(event)}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '50ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        margin="2%"
                    >
                        <Stack
                            alignItems="center"
                            justifyContent="center">
                            {isSuccess && <Alert id="alert-success" data-testid="alert-success" severity='success' sx={{ width: '100%', marginBottom: '5%' }}>Product added successfully!</Alert>}
                            {error.length > 0 && error.map(e => <Alert id="alert-error" data-testid="alert-error" severity='error' sx={{ width: '100%', marginBottom: '5%' }}>{e['message']}</Alert>)}
                            <TextField
                                value={name}
                                onChange={(event) => { setName(event.target.value) }}
                                required
                                id="name-field"
                                data-testid="name-field"
                                label="Name"
                                sx={{ width: "75%" }} />
                            <TextField
                                id="currency-field"
                                data-testid="currency-field"
                                select
                                label="Currency"
                                defaultValue="EUR"
                                helperText="Please select your currency"
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                value={price}
                                onChange={(event) => { setPrice(Number(event.target.value)) }}
                                required
                                id="price-field"
                                data-testid="price-field"
                                label="Price"
                                type="number"
                                inputProps={{ min: 0 }} />
                            <Button
                                type="submit"
                                data-testid="submit-button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add
                            </Button>
                        </Stack>
                    </Box>)
                    : (<Typography align='center' marginTop={10}>You don't have rights to access this page.</Typography>)}
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

export default AddProductPage;