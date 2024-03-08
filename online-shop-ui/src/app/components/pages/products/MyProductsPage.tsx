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
import Typography from '@mui/material/Typography';

import Copyright from '../../footer/Copyright';
import Header from '../../Header';
import { getSellerProducts } from '../../../api/ProductRequest';
import Product from './Product';
import SellIcon from '@mui/icons-material/Sell';

import { useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { getTranslation } from '../../../../i18n/i18n';
import MyProductCard from './MyProductCard';
import { Paper } from '@mui/material';

const ProductsContainer = () => {
  const jwt = useAppSelector(state => state.jwt);
  const roles = useAppSelector(state => state.info.info.roles);
  const lang = useAppSelector(state => state.lang.lang);
  const username = useAppSelector(state => state.username.sub);

  const [products, setProducts] = React.useState<Product[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = jwt.token;

    const fetchProducts = async () => {
      const productsResponse = await getSellerProducts(token, username);

      if (productsResponse.status) {
        if (productsResponse.status == 401) {
          navigate("/login");
        }
      }

      setProducts(productsResponse);
    }

    fetchProducts(); // NOSONAR: It should not await.
  }, []);

  return (
    <Container component="main" maxWidth={false} id="my-products-container" sx={{ height: "100vh" }} disableGutters>
      <Header />
      <Paper square elevation={3} sx={{ width: "70%", padding: "2.5%", margin: "auto", mt: "2.5%", display: "flex" }}>
        <SellIcon fontSize='large' sx={{ marginRight: "1.5%" }} />
        <Typography variant="h4" fontWeight={800}>{getTranslation(lang, "my_products")}</Typography>
      </Paper>

      {// @ts-ignore 
        roles[0].name == "SELLER" ?
          (<Paper square elevation={3} sx={{ width: "70%", height: "50%", paddingBottom: "2.5%", pl: "2.5%", pr: "2.5%", margin: "auto", mt: "2.5%", display: "flex", flexDirection: "column", overflowY: "scroll" }}>
            {products.length > 0 && products.map(product => {
              return (<div key={product.objectID} style={{ marginTop: "3.5%" }}><MyProductCard key={product.objectID} objectID={product.objectID} name={product.name} price={product.price} categories={product.categories} description={product.description} /></div>);
            })}
          </Paper>) : (<Typography align='center' marginTop={10}>{getTranslation(lang, "no_rights_to_access")}</Typography>)
      }
      <Copyright />

    </Container>
  );
}

export default ProductsContainer;