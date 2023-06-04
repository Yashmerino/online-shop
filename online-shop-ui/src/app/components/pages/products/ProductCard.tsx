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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { addProductToCart } from '../../../api/ProductRequest';
import { useAppSelector } from '../../../hooks';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ProductCardProps {
  id: number,
  title: string,
  price: string,
}

const ProductCard = ({ id, title, price }: ProductCardProps) => {
  const [isAdded, setAdded] = React.useState<boolean>(false);

  const jwt = useAppSelector(state => state.jwt);

  const handleAlertClick = () => {
    setAdded(false);
  };

  const addProduct = async () => {
    setAdded(false);

    const response = await addProductToCart(jwt.token, id, 1);

    if (response.status == 200) {
      setAdded(true);
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
        <Button size="small" color="primary" onClick={addProduct}>
          Add To Cart
        </Button>
      </CardActions>
      {isAdded &&
        <Snackbar open={isAdded} autoHideDuration={2000} onClose={handleAlertClick}>
          <Alert onClose={handleAlertClick} severity="success" sx={{ width: '100%' }}>
            The product has been successfully added to the cart!
          </Alert>
        </Snackbar>}
    </Card>
  );
}

export default ProductCard;