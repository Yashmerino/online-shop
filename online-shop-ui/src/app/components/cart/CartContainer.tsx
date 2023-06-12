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
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import Copyright from '../footer/Copyright';
import Header from '../Header';
import { getCartItems } from '../../api/CartItemsRequest';
import CartItemCard from './CartItemCard';

import { useAppSelector } from '../../hooks';

interface CartItem {
    id: number,
    productId: number,
    name: string,
    price: string,
}

const CartContainer = () => {
    const jwt = useAppSelector(state => state.jwt);
    const user = useAppSelector(state => state.user);
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

    React.useEffect(() => {
        const token = jwt.token;

        const fetchCartItems = async () => {
            const cartItems = await getCartItems(token, user.info.sub);
            setCartItems(cartItems);
        }

        fetchCartItems(); // NOSONAR: It should not await.
    }, []);

    return (
        <Container component="main" maxWidth={false} id="main-container" disableGutters>
            <Header />
            <Grid container justifyContent="center" alignItems="center" columnGap={2}>
                {cartItems.length > 0 && cartItems.map(cartItem => {
                    return (<CartItemCard key={cartItem.id} id={cartItem.id} title={cartItem.name} price={cartItem.price} />);
                })}
            </Grid>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

export default CartContainer;