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

import com.yashmerino.online.shop.model.dto.LoginDTO;
import com.yashmerino.online.shop.model.dto.RegisterDTO;
import com.yashmerino.online.shop.utils.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static com.yashmerino.online.shop.utils.Role.USER;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.annotation.DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Tests {@link AuthController} endpoints.
 */
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = AFTER_EACH_TEST_METHOD)
@ActiveProfiles("test")
class AuthControllerTest {

    /**
     * MVC Mock.
     */
    @Autowired
    private MockMvc mvc;

    /**
     * Register DTO.
     */
    private RegisterDTO registerDTO;

    /**
     * Login DTO.
     */
    private LoginDTO loginDTO;

    @BeforeEach
    void initialize() {
        registerDTO = new RegisterDTO();
        registerDTO.setRole(USER);
        registerDTO.setUsername("test");
        registerDTO.setPassword("test");
        registerDTO.setEmail("test@test.test");

        loginDTO = new LoginDTO();
        loginDTO.setUsername("test");
        loginDTO.setPassword("test");
    }

    /**
     * Tests that /register endpoint works as expected.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    void registerSuccessfulTest() throws Exception {
        MvcResult result = mvc.perform(post("/api/auth/register").contentType(
                APPLICATION_JSON).content(registerDTO.toJson())).andExpect(status().isOk()).andReturn();

        String content = result.getResponse().getContentAsString();
        assertTrue(content.contains("User registered successfully!"));
    }

    /**
     * Tests /register with existing user.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    void registerExistingUserTest() throws Exception {
        mvc.perform(post("/api/auth/register").contentType(
                APPLICATION_JSON).content(registerDTO.toJson())).andExpect(status().isOk());

        MvcResult result = mvc.perform(post("/api/auth/register").contentType(
                APPLICATION_JSON).content(registerDTO.toJson())).andExpect(status().isBadRequest()).andReturn();

        String content = result.getResponse().getContentAsString();
        assertTrue(content.contains("Username is taken!"));
    }

    /**
     * Tests /register without username.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    void registerNoUsername() throws Exception {
        mvc.perform(post("/api/auth/register").contentType(
                APPLICATION_JSON).content(registerDTO.toJson())).andExpect(status().isOk());
    }

    /**
     * Tests /register without body.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    void registerNoRequestBodyTest() throws Exception {
        mvc.perform(post("/api/auth/register")).andExpect(status().isBadRequest());
    }

    /**
     * Tests /register without password.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    void registerNoPasswordTest() throws Exception {
        mvc.perform(post("/api/auth/register").contentType(
                APPLICATION_JSON).content(registerDTO.toJson())).andExpect(status().isOk());
    }

    /**
     * Tests that /login endpoint works as expected.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    void loginSuccessfulTest() throws Exception {
        mvc.perform(post("/api/auth/register").contentType(
                APPLICATION_JSON).content(registerDTO.toJson())).andExpect(status().isOk());

        MvcResult result = mvc.perform(post("/api/auth/login").contentType(
                APPLICATION_JSON).content(loginDTO.toJson())).andExpect(status().isOk()).andReturn();

        String content = result.getResponse().getContentAsString();
        assertTrue(content.contains("Bearer "));
    }

    /**
     * Tests /login with a non-existing user
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    void loginNonExistingUserTest() throws Exception {
        mvc.perform(post("/api/auth/login").contentType(
                APPLICATION_JSON).content(loginDTO.toJson())).andExpect(status().isUnauthorized());
    }

    /**
     * Tests /login without username.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    void loginNoUsernameTest() throws Exception {
        mvc.perform(post("/api/auth/register").contentType(
                APPLICATION_JSON).content(registerDTO.toJson())).andExpect(status().isOk());

        loginDTO.setUsername("");

        mvc.perform(post("/api/auth/login").contentType(
                APPLICATION_JSON).content(loginDTO.toJson())).andExpect(status().isUnauthorized());
    }

    /**
     * Tests /login without password.
     *
     * @throws Exception if something goes wrong.
     */
    @Test
    void loginNoPasswordTest() throws Exception {
        mvc.perform(post("/api/auth/register").contentType(
                APPLICATION_JSON).content(registerDTO.toJson())).andExpect(status().isOk());

        loginDTO.setPassword("");

        mvc.perform(post("/api/auth/login").contentType(
                APPLICATION_JSON).content(loginDTO.toJson())).andExpect(status().isUnauthorized());
    }
}
