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
import { useAppSelector } from '../../hooks';
import { deleteCartItem, changeQuantity } from '../../api/CartItemsRequest';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import QuantityInput from '../QuantityInput';

interface CartItemProps {
  id: number,
  title: string,
  price: string,
  quantity: number
}

const CartItemCard = ({ id, title, price, quantity }: CartItemProps) => {
  const [isDeleted, setDeleted] = React.useState<boolean>(false);
  const [isSuccess, setSuccess] = React.useState<boolean>(false);

  const jwt = useAppSelector(state => state.jwt);

  const handleAlertClick = () => {
    setDeleted(false);
    setSuccess(false);
  };

  const handleDeleteProduct = async () => {
    setDeleted(false);
    setSuccess(false);

    const response = await deleteCartItem(jwt.token, id);

    if (response.status == 200) {
      setDeleted(true);
    }
  }

  const handleSaveProduct = async () => {
    setDeleted(false);
    setSuccess(false);

    const updatedQuantity = (document.getElementById(`quantity-input-${id}`) as HTMLInputElement).value;
    const response = await changeQuantity(jwt.token, id, parseInt(updatedQuantity));

    if (response.status == 200) {
      setSuccess(true);
    }
  }

  return (
    <Card sx={{ maxWidth: 400, marginTop: "5%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          alt="product"
          width="320"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
        <Button variant="contained" onClick={handleDeleteProduct} data-testid={"delete-button-" + id}>Delete</Button>
        <QuantityInput id={`quantity-input-${id}`} defaultValue={quantity} />
        <Button variant="contained" onClick={handleSaveProduct} data-testid={"save-button-" + id}>Save</Button>
      </CardActions>
      {isDeleted &&
        <Snackbar open={isDeleted} autoHideDuration={2000} onClose={handleAlertClick}>
          <Alert onClose={handleAlertClick} severity="success" sx={{ width: '100%' }}>
            The cart item has been deleted successfully!
          </Alert>
        </Snackbar>}
      {isSuccess &&
        <Snackbar open={isSuccess} autoHideDuration={2000} onClose={handleAlertClick}>
          <Alert onClose={handleAlertClick} severity="success" sx={{ width: '100%' }}>
            The cart item has been updated successfully!
          </Alert>
        </Snackbar>}
    </Card>
  );
}

export default CartItemCard;