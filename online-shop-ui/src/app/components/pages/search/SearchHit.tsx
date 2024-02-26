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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import { useAppSelector } from '../../../hooks';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { deleteCartItem } from '../../../api/CartItemsRequest';
import { addProductToCart, deleteProduct, getProductPhoto } from '../../../api/ProductRequest';
import { getTranslation } from '../../../../i18n/i18n';
import NoPhoto from "../../../../img/no_photo.jpg";
import { useNavigate } from 'react-router-dom';

interface ISearchHit {
    objectID: number,
    name: string,
    price: number
}

const SearchHit = ({ objectID, name, price }: ISearchHit) => {
    const [isSuccess, setSuccess] = React.useState<boolean>(false);
    const [photo, setPhoto] = React.useState(NoPhoto);
    const lang = useAppSelector(state => state.lang.lang);
    const jwt = useAppSelector(state => state.jwt);
    const navigate = useNavigate();

    const handleAlertClick = () => {
        setSuccess(false);
    };

    const handleAddProduct = async () => {
        setSuccess(false);

        const response = await addProductToCart(jwt.token, objectID, 1);

        if (response.status) {
            if (response.status == 401) {
                navigate("/login");
            }
        }

        if (response.status == 200) {
            setSuccess(true);
        }
    }

    React.useEffect(() => {
        const getProductPhotoRequest = async () => {
            const photoBlob = await getProductPhoto(objectID);

            if (photoBlob.size > 0) {
                setPhoto(URL.createObjectURL(photoBlob));
            }
        }

        getProductPhotoRequest();
    }, []);

    return (<>
        {isSuccess &&
            <Snackbar open={isSuccess} autoHideDuration={2000} onClose={handleAlertClick}>
                <Alert onClose={handleAlertClick} severity="success" sx={{ width: '100%' }}>
                    {getTranslation(lang, "product_added_successfully")}
                </Alert>
            </Snackbar>}
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Box height={"5vh"} sx={{ aspectRatio: "1/1" }}>
                <img width={"100%"} height={"100%"} className="card-image" src={photo} data-testid={"card-image-" + objectID} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 200, width: "35%", ml: "1.5%", overflow: "hidden", lineHeight: "1", textOverflow: "ellipsis" }}>{name}</Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, marginLeft: "2%" }}>{price + "€"}</Typography>
            <IconButton color="primary" data-testid="add-icon" aria-label="add-to-cart" sx={{ zIndex: "99999999", border: "1px solid", marginLeft: "2%", width: "3.5vh", height: "3.5vh" }} onClick={handleAddProduct}>
                <AddShoppingCartIcon />
            </IconButton>
        </Box>
    </>
    );
}

export default SearchHit;