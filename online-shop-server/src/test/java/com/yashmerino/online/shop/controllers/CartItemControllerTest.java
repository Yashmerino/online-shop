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
import static org.springframework.test.annotation.DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Tests for {@link CartItemController}
 */
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = AFTER_EACH_TEST_METHOD)
@ActiveProfiles("test")
class CartItemControllerTest {

    /**
     * Mock mvc to perform requests.
     */
    @Autowired
    private MockMvc mvc;

    /**
     * Test get cart item.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    @WithMockUser(username = "user", authorities = {"USER"})
    void getCartItemTest() throws Exception {
        MvcResult result = mvc.perform(get("/api/cartItem/1")).andExpect(status().isOk()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("{\"productId\":1,\"cartId\":1,\"quantity\":1}"));
    }

    /**
     * Test delete cart item.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    @WithMockUser(username = "user", authorities = {"USER"})
    void addCartItemTest() throws Exception {
        MvcResult result = mvc.perform(delete("/api/cartItem/1")).andExpect(status().isOk()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("Item successfully deleted!"));
    }

    /**
     * Test change item's quantity.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    @WithMockUser(username = "user", authorities = {"USER"})
    void changeQuantityTest() throws Exception {
        MvcResult result = mvc.perform(post("/api/cartItem/1/quantity?quantity=5")).andExpect(status().isOk()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("Quantity of the item successfully changed!"));

        result = mvc.perform(get("/api/cartItem/1")).andExpect(status().isOk()).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("{\"productId\":1,\"cartId\":1,\"quantity\":5}"));
    }

}
