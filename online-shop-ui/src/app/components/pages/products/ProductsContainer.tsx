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

import Copyright from '../../footer/Copyright';
import Header from '../../Header';
import ProductCard from './ProductCard';
import { getProducts } from '../../../api/ProductRequest';
import Product from './Product';

import { useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import Banner from "../../../../img/banner.jpg";
import { getTranslation } from '../../../../i18n/i18n';

const ProductsContainer = () => {
  const jwt = useAppSelector(state => state.jwt);
  const lang = useAppSelector(state => state.lang.lang);

  const [products, setProducts] = React.useState<Product[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = jwt.token;

    const fetchProducts = async () => {
      const productsResponse = await getProducts(token);

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
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '200px', sm: '300px', md: '400px' },
            mb: 4,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
          }}
        >
          <img
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            alt="banner"
            src={Banner}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h2"
              color="white"
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {getTranslation(lang, "online_shop")}
            </Typography>
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: 'background.default',
          }}
        >
          {products.length > 0 ? (
            <Grid
              container
              spacing={3}
              justifyContent="center"
            >
              {products.map(product => (
                <Grid item key={product.objectID}>
                  <ProductCard
                    id={product.objectID}
                    title={product.name}
                    price={product.price}
                    categories={product.categories as any}
                    description={product.description}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                py: 8,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h4"
                color="text.secondary"
                sx={{
                  mb: 2,
                  fontWeight: 500,
                }}
              >
                {getTranslation(lang, "no_products_found")}
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
      <Copyright />
    </Box>
  );
}

export default ProductsContainer;