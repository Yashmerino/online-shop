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
import { addProductToCart, deleteProduct, getProductPhoto } from '../../../api/ProductRequest';
import { useAppSelector } from '../../../hooks';
import QuantityInput from '../../QuantityInput';
import { useNavigate } from 'react-router-dom';
import { getTranslation } from '../../../../i18n/i18n';

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
  categories: string[],
  description: string,
  shouldBeAbleToDelete: boolean
}

const ProductCard = ({ id, title, price, categories, description, shouldBeAbleToDelete }: ProductCardProps) => {
  const navigate = useNavigate();

  const roles = useAppSelector(state => state.info.info.roles);
  const lang = useAppSelector(state => state.lang.lang);
  const [isAdded, setAdded] = React.useState<boolean>(false);
  const [isDeleted, setDeleted] = React.useState<boolean>(false);
  const [photo, setPhoto] = React.useState("");

  const jwt = useAppSelector(state => state.jwt);

  const handleAlertClick = () => {
    setAdded(false);
    setDeleted(false);
  };

  const handleAddProduct = async () => {
    setAdded(false);

    const quantity = (document.getElementById(`quantity-input-${id}`) as HTMLInputElement).value;
    const response = await addProductToCart(jwt.token, id, parseInt(quantity));

    if (response.status == 200) {
      setAdded(true);
    }
  }

  const handleDeleteProduct = async () => {
    setDeleted(false);

    const response = await deleteProduct(jwt.token, id);

    if (response.status == 200) {
      setDeleted(true);
    }
  }

  const handleEditProduct = async () => {
    // @ts-ignore 
    if (roles[0].name == "USER") {
      return;
    }

    navigate("/product/edit", {
      state: {
        id: id,
        title: title,
        categories: categories,
        price: price,
        description: description
      }
    })
  }

  React.useEffect(() => {
    const getProductPhotoRequest = async () => {
      const photoBlob = await getProductPhoto(id);
      setPhoto(URL.createObjectURL(photoBlob));
    }

    getProductPhotoRequest();
  }, []);

  return (
    <Card sx={{ maxWidth: 400, minWidth: 320, marginTop: "5%" }}>
      <CardActionArea onClick={handleEditProduct}>
        <CardMedia
          component="img"
          height="140"
          alt="product"
          width="320"
          src={photo}
          sx={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {getTranslation(lang, "price") + price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
        {// @ts-ignore 
          roles[0].name == "USER" ? <Button size="small" color="primary" onClick={handleAddProduct}> {/* NOSONAR: Function addProduct doesn't return Promise.*/}{getTranslation(lang, "add_to_cart")}</Button> : null
        }
        {shouldBeAbleToDelete && <Button variant="contained" onClick={handleDeleteProduct} data-testid={"delete-button-" + id}>{getTranslation(lang, "delete")}</Button>}
        {// @ts-ignore 
          roles[0].name == "USER" ? <QuantityInput id={`quantity-input-${id}`} defaultValue={1} /> : null
        }
      </CardActions>
      {isAdded &&
        <Snackbar open={isAdded} autoHideDuration={2000} onClose={handleAlertClick}>
          <Alert onClose={handleAlertClick} severity="success" sx={{ width: '100%' }}>
            {getTranslation(lang, "product_added_to_cart_successfully")}
          </Alert>
        </Snackbar>}
      {isDeleted &&
        <Snackbar open={isDeleted} autoHideDuration={2000} onClose={handleAlertClick}>
          <Alert onClose={handleAlertClick} severity="success" sx={{ width: '100%' }}>
            {getTranslation(lang, "product_deleted_successfully")}
          </Alert>
        </Snackbar>}
    </Card>
  );
}

export default ProductCard;