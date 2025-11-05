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
import { Box, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Box sx={{ 
          mb: 4, 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              color: 'primary.main'
            }}
          >
            <SellIcon fontSize="large" />
            {getTranslation(lang, "my_products")}
          </Typography>
          
          {// @ts-ignore 
            roles[0].name === "SELLER" && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/product/add')}
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1
                }}
              >
                {getTranslation(lang, "add_product")}
              </Button>
            )
          }
        </Box>

        {// @ts-ignore 
          roles[0].name === "SELLER" ? (
            <Paper 
              elevation={2} 
              sx={{ 
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                minHeight: '70vh'
              }}
            >
              {products.length > 0 ? (
                <Box
                  sx={{
                    overflowY: 'auto',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  {products.map(product => (
                    <MyProductCard
                      key={product.objectID}
                      objectID={product.objectID}
                      name={product.name}
                      price={product.price}
                      categories={product.categories}
                      description={product.description}
                    />
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    minHeight: '70vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    p: 4,
                    color: 'text.secondary'
                  }}
                >
                  <Box
                    component="img"
                    src="/empty-box.png"
                    alt="No products"
                    sx={{
                      width: 120,
                      height: 120,
                      opacity: 0.5
                    }}
                  />
                  <Typography variant="h6" textAlign="center">
                    {getTranslation(lang, "no_products_found")}
                  </Typography>
                  <Typography variant="body2" textAlign="center">
                    {getTranslation(lang, "start_by_adding_product")}
                  </Typography>
                </Box>
              )}
            </Paper>
          ) : (
            <Box
              sx={{
                minHeight: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography 
                variant="h6" 
                color="text.secondary" 
                textAlign="center"
              >
                {getTranslation(lang, "no_rights_to_access")}
              </Typography>
            </Box>
          )
        }
      </Container>
      <Copyright />
    </Box>
  );
}

export default ProductsContainer;