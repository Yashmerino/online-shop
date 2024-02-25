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
import { Box, Button, CardActionArea, CardActions, IconButton } from '@mui/material';
import { addProductToCart, deleteProduct, getProductPhoto } from '../../../api/ProductRequest';
import { useAppSelector } from '../../../hooks';
import QuantityInput from '../../QuantityInput';
import { useNavigate } from 'react-router-dom';
import { getTranslation } from '../../../../i18n/i18n';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

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
}

const ProductCard = ({ id, title, price, categories, description }: ProductCardProps) => {
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

    const response = await addProductToCart(jwt.token, id, 1);

    if (response.status == 200) {
      setAdded(true);
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

      if (photoBlob.size > 0) {
        setPhoto(URL.createObjectURL(photoBlob));
      }
    }

    getProductPhotoRequest();
  }, []);

  return (
    <>
      {isAdded &&
        <Snackbar open={isAdded} autoHideDuration={2000} onClose={handleAlertClick}>
          <Alert onClose={handleAlertClick} severity="success" sx={{ width: '100%' }}>
            {getTranslation(lang, "product_added_to_cart_successfully")}
          </Alert>
        </Snackbar>}
      <div onClick={handleEditProduct} className={roles[0].name == "SELLER" ? "my-product-card" : ""}>
        <Box sx={{ display: "flex", flexDirection: "column", }}>
          <Box height={"20vh"} width={"32vh"}>
            <img width={"100%"} height={"100%"} src={photo} data-testid={"card-image-" + id} style={{ objectFit: "cover", borderRadius: "15px" }} />
            {// @ts-ignore 
              roles[0].name == "USER" ? (
                <IconButton color="primary" aria-label="add to shopping cart" onClick={handleAddProduct} sx={{ marginLeft: "83%", border: "1px solid", width: "15%", height: "25%" }}>
                  {/* NOSONAR: Function addProduct doesn't return Promise.*/}
                  <AddShoppingCartIcon />
                </IconButton>) : null
            }
          </Box>
          <Box margin="0 5%" width="22vh">
            <Typography variant="body2" fontSize={10} sx={{ marginTop: "3%", lineHeight: "1", overflow: "hidden", overflowWrap: "break-word" }}>{categories[0] || getTranslation(lang, "no_category")}</Typography>
            <Typography variant="body1" sx={{ marginTop: "2.5%", height: "3.3vh", lineHeight: "1", overflow: "hidden", overflowWrap: "break-word" }}>{title}</Typography>
            <Typography variant="body1" fontWeight={800} sx={{ marginTop: "2.5%", height: "3vh", lineHeight: "1", overflow: "hidden", overflowWrap: "break-word" }}>{price + "€"}</Typography>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default ProductCard;