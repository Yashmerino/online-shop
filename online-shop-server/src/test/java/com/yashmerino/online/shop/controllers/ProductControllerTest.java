package com.yashmerino.online.shop.controllers;
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 + MIT License
 +
 + Copyright (c) 2023 Artiom Bozieac
 +
 + Permission is hereby granted, free of charge, to any person obtaining a copy
 + of this software and associated documentation files (the "Software"), to deal
 + in the Software without restriction, including without limitation the rights
 + to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 + copies of the Software, and to permit persons to whom the Software is
 + furnished to do so, subject to the following conditions:
 +
 + The above copyright notice and this permission notice shall be included in all
 + copies or substantial portions of the Software.
 +
 + THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 + IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 + FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 + AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 + LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 + OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 + SOFTWARE.
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yashmerino.online.shop.model.dto.ProductDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.annotation.DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Tests for {@link ProductController}
 */
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = AFTER_EACH_TEST_METHOD)
@ActiveProfiles("test")
class ProductControllerTest {

    /**
     * Mock mvc to perform requests.
     */
    @Autowired
    private MockMvc mvc;

    /**
     * Object mapper.
     */
    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Product DTO to use in tests.
     */
    private final ProductDTO productDTO = new ProductDTO();

    @BeforeEach
    void setup() {
        productDTO.setName("Product");
        productDTO.setPrice(2.50);
    }

    /**
     * Test add valid product.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    @WithMockUser(username = "seller", authorities = {"SELLER"})
    void addValidProductTest() throws Exception {
        MvcResult result = mvc.perform(post("/api/product")
                .content(objectMapper.writeValueAsString(productDTO)).contentType(
                        APPLICATION_JSON)).andExpect(status().isOk()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("Product successfully added!"));
    }

    /**
     * Test add invalid product.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    @WithMockUser(username = "seller", authorities = {"SELLER"})
    void addInvalidProductTest() throws Exception {
        mvc.perform(post("/api/product")
                .content("error").contentType(
                        APPLICATION_JSON)).andExpect(status().isBadRequest());
    }

    /**
     * Test get product.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    @WithMockUser(username = "seller", authorities = {"SELLER"})
    void getProductTest() throws Exception {
        MvcResult result = mvc.perform(post("/api/product")
                .content(objectMapper.writeValueAsString(productDTO)).contentType(
                        APPLICATION_JSON)).andExpect(status().isOk()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("Product successfully added!"));

        result = mvc.perform(get("/api/product/2")).andExpect(status().isOk()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("{\"id\":2,\"name\":\"Product\",\"price\":2.5,\"categories\":[]}"));
    }

    /**
     * Test get all products.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    @WithMockUser(username = "seller", authorities = {"SELLER"})
    void getAllProductsTest() throws Exception {
        MvcResult result = mvc.perform(post("/api/product")
                .content(objectMapper.writeValueAsString(productDTO)).contentType(
                        APPLICATION_JSON)).andExpect(status().isOk()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("Product successfully added!"));

        productDTO.setName("Banana");
        productDTO.setPrice(1.25);

        result = mvc.perform(post("/api/product")
                .content(objectMapper.writeValueAsString(productDTO)).contentType(
                        APPLICATION_JSON)).andExpect(status().isOk()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("Product successfully added!"));

        result = mvc.perform(get("/api/product")).andExpect(status().isOk()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("[{\"id\":1,\"name\":\"Phone\",\"price\":5.0,\"categories\":[]},{\"id\":2,\"name\":\"Product\",\"price\":2.5,\"categories\":[]},{\"id\":3,\"name\":\"Banana\",\"price\":1.25,\"categories\":[]}]"));
    }

    /**
     * Test add product to cart.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    @WithMockUser(username = "user", authorities = {"USER"})
    void addProductToCartTest() throws Exception {
        MvcResult result = mvc.perform(get("/api/product/1/add?cartId=1&quantity=1")).andExpect(status().isOk()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("{\"status\":200,\"message\":\"Product successfully added to the cart!\"}"));
    }

    /**
     * Test request with wrong role.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    @WithMockUser(username = "user", authorities = {"USER"})
    void requestWithWrongRoleTest() throws Exception {
        mvc.perform(post("/api/product")
                .content("error").contentType(
                        APPLICATION_JSON)).andExpect(status().isForbidden());
    }

    /**
     * Test delete product.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    @WithMockUser(username = "seller", authorities = {"SELLER"})
    void deleteProductTest() throws Exception {
        MvcResult result = mvc.perform(delete("/api/product/1")
                .content(objectMapper.writeValueAsString(productDTO)).contentType(
                        APPLICATION_JSON)).andExpect(status().isOk()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("Product successfully deleted!"));
    }

    /**
     * Test delete non-existent product.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    @WithMockUser(username = "seller", authorities = {"SELLER"})
    void deleteNonexistentProductTest() throws Exception {
        MvcResult result = mvc.perform(delete("/api/product/99999")
                .content(objectMapper.writeValueAsString(productDTO)).contentType(
                        APPLICATION_JSON)).andExpect(status().isNotFound()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("Product couldn't be found!"));
    }

    /**
     * Test add product without name.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    @WithMockUser(username = "seller", authorities = {"SELLER"})
    void addProductWithoutNameTest() throws Exception {
        productDTO.setName("");

        MvcResult result = mvc.perform(post("/api/product")
                .content(objectMapper.writeValueAsString(productDTO)).contentType(
                        APPLICATION_JSON)).andExpect(status().isBadRequest()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("{\"fieldErrors\":[{\"field\":\"name\",\"message\":\"Name is required.\"}]}"));
    }

    /**
     * Test add product with zero price.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    @WithMockUser(username = "seller", authorities = {"SELLER"})
    void addProductWithZeroPriceTest() throws Exception {
        productDTO.setPrice(0.0);

        MvcResult result = mvc.perform(post("/api/product")
                .content(objectMapper.writeValueAsString(productDTO)).contentType(
                        APPLICATION_JSON)).andExpect(status().isBadRequest()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("{\"fieldErrors\":[{\"field\":\"price\",\"message\":\"Price should be greater than or equal to 0.01.\"}]}"));
    }

    /**
     * Test add product without name and with zero price.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    @WithMockUser(username = "seller", authorities = {"SELLER"})
    void addProductWithoutNameAndWithZeroPriceTest() throws Exception {
        productDTO.setPrice(0.0);
        productDTO.setName("");

        MvcResult result = mvc.perform(post("/api/product")
                .content(objectMapper.writeValueAsString(productDTO)).contentType(
                        APPLICATION_JSON)).andExpect(status().isBadRequest()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("{\"field\":\"price\",\"message\":\"Price should be greater than or equal to 0.01.\"}"));
        assertTrue(result.getResponse().getContentAsString().contains("{\"field\":\"name\",\"message\":\"Name is required.\"}"));
    }
}
