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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
        productDTO.setUserId(1L);
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

        assertTrue(result.getResponse().getContentAsString().contains("{\"id\":2,\"name\":\"Product\",\"price\":2.5,\"categories\":[],\"userId\":1}"));
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

        assertTrue(result.getResponse().getContentAsString().contains("[{\"id\":1,\"name\":\"Phone\",\"price\":5.0,\"categories\":[],\"userId\":2},{\"id\":2,\"name\":\"Product\",\"price\":2.5,\"categories\":[],\"userId\":1},{\"id\":3,\"name\":\"Banana\",\"price\":1.25,\"categories\":[],\"userId\":1}]"));
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
}
