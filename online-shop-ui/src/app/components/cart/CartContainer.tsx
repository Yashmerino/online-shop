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

import Copyright from '../footer/Copyright';
import Header from '../Header';
import { getCartItems } from '../../api/CartItemsRequest';
import CartItemCard from './CartItemCard';

import { useAppSelector } from '../../hooks';
import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Paper } from '@mui/material';
import { getTranslation } from '../../../i18n/i18n';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';
import PaymentsIcon from '@mui/icons-material/Payments';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { CurrencyBitcoin } from '@mui/icons-material';

interface CartItem {
    id: number,
    productId: number,
    name: string,
    price: string,
    quantity: number
}

const CartContainer = () => {
    const jwt = useAppSelector(state => state.jwt);
    const username = useAppSelector(state => state.username);
    const lang = useAppSelector(state => state.lang.lang);
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
    const [total, setTotal] = React.useState<number>(0);
    const navigate = useNavigate();

    React.useEffect(() => {
        const token = jwt.token;

        const fetchCartItems = async () => {
            const cartItems = await getCartItems(token, username.sub);

            if (cartItems.status) {
                if (cartItems.status == 401) {
                    navigate("/login");
                }
            }

            setCartItems(cartItems);

            let currentTotal = 0;

            if (Array.isArray(cartItems)) {
                cartItems.forEach((element: CartItem) => {
                    currentTotal += Number(element.price);
                });
            }

            setTotal(currentTotal)
        }

        fetchCartItems(); // NOSONAR: It should not await.
    }, []);

    return (
        <Container component="main" maxWidth={false} id="main-container" sx={{ height: "100vh" }} disableGutters>
            <Header />
            <Paper square elevation={3} sx={{ width: "70%", padding: "2.5%", margin: "auto", mt: "2.5%", display: "flex" }}>
                <ShoppingCartIcon fontSize='large' sx={{ marginRight: "1.5%" }} />
                <Typography variant="h4" fontWeight={800}>{getTranslation(lang, "my_cart")}</Typography>
            </Paper>
            <Box sx={{ display: 'flex', flexDirection: "row", width: "70%", margin: "auto" }}>
                <Paper square elevation={3} sx={{ overflowY: "scroll", width: "60%", height: "42.5vh", paddingBottom: "1.5%", paddingLeft: "2.5%", paddingRight: "2.5%", mt: "2.5%", display: "flex", flexDirection: "column" }}>
                    {cartItems.length > 0 && cartItems.map(cartItem => {
                        return (<Box mt={"3%"} key={cartItem.id}><CartItemCard key={cartItem.id} id={cartItem.id} productId={cartItem.productId} title={cartItem.name} price={cartItem.price} quantity={cartItem.quantity} /></Box>);
                    })}
                </Paper>
                <Paper square elevation={3} sx={{ marginLeft: "2.5%", width: "40%", padding: "2.5%", mt: "2.5%", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                        <Typography variant="h5" lineHeight={1}>{getTranslation(lang, "total")}</Typography>
                        <Typography variant="h5" lineHeight={1}>{total}€</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                        <Typography variant="body2" lineHeight={1} mt="1%">{getTranslation(lang, "products_price")}</Typography>
                        <Typography variant="body2" lineHeight={1} mt="1%">{total}€</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                        <Typography variant="body2" lineHeight={1} mt="1%">{getTranslation(lang, "delivery_price")}</Typography>
                        <Typography variant="body2" lineHeight={1} mt="1%">0€</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                        <Typography variant="body2" lineHeight={1} mt="1%">{getTranslation(lang, "discount")}</Typography>
                        <Typography variant="body2" lineHeight={1} mt="1%">0%</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: "5%" }}>
                        <Paper elevation={6} sx={{ mt: "5%", p: "7.5%", width: "30%", display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center" }}>
                            <PaymentsIcon fontSize='large' />
                            <Typography variant="body1" sx={{ lineHeight: "1", overflowWrap: "break-word", mt: "20%" }}>{getTranslation(lang, "cash")}</Typography>
                        </Paper>
                        <Paper elevation={6} sx={{ mt: "5%", p: "7.5%", width: "30%", display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center" }}>
                            <CreditCardIcon fontSize='large' />
                            <Typography variant="body1" sx={{ lineHeight: "1", overflowWrap: "break-word", mt: "20%" }}>{getTranslation(lang, "card")}</Typography>
                        </Paper>
                        <Paper elevation={6} sx={{ mt: "5%", p: "7.5%", width: "30%", display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center" }}>
                            <CurrencyBitcoin fontSize='large' />
                            <Typography variant="body1" sx={{ lineHeight: "1", overflowWrap: "break-word", mt: "20%" }}>{getTranslation(lang, "crypto")}</Typography>
                        </Paper>
                    </Box>
                    <FormControlLabel sx={{ mt: "7.5%" }} control={<Checkbox defaultChecked />} label="Remember my payment method" />
                </Paper>
            </Box>
            <Box sx={{ width: "70%", display: "flex", flexDirection: "column", alignItems: "flex-end", margin: "auto" }}>
                <Button variant="contained" sx={{ width: "5%", mt: "2%" }}>
                    Buy
                </Button>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

export default CartContainer;