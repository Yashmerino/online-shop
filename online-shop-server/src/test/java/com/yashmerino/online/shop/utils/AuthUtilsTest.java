package com.yashmerino.online.shop.utils;
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

import com.yashmerino.online.shop.exceptions.InvalidEmailException;
import com.yashmerino.online.shop.exceptions.NoEmailProvidedException;
import com.yashmerino.online.shop.exceptions.NoPasswordProvidedException;
import com.yashmerino.online.shop.exceptions.NoUsernameProvidedException;
import com.yashmerino.online.shop.model.dto.auth.LoginDTO;
import com.yashmerino.online.shop.model.dto.auth.RegisterDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Tests for {@link AuthUtils}
 */
class AuthUtilsTest {

    /**
     * Register DTO for tests.
     */
    private RegisterDTO registerDTO;

    /**
     * Login DTO for tests.
     */
    private LoginDTO loginDTO;

    @BeforeEach
    void setup() {
        registerDTO = new RegisterDTO();
        registerDTO.setEmail("test@test.test");
        registerDTO.setUsername("test");
        registerDTO.setPassword("test");

        loginDTO = new LoginDTO();
        loginDTO.setUsername("test");
        loginDTO.setPassword("test");
    }

    /**
     * Test if registerDTO is valid.
     */
    @Test
    void validRegisterDTOTest() {
        AuthUtils.validateRegistration(registerDTO);
    }

    /**
     * Tests if an email is valid.
     */
    @Test
    void isEmailValidRegisterTest() {
        registerDTO.setEmail("valid@email.com");

        AuthUtils.validateRegistration(registerDTO);
    }

    /**
     * Test if an email is only whitespaces and is not provided.
     */
    @ParameterizedTest
    @ValueSource(strings = {"    ", ""})
    void badEmailRegisterTest(final String email) {
        registerDTO.setEmail("    ");

        assertThrows(NoEmailProvidedException.class, () -> {
            AuthUtils.validateRegistration(registerDTO);
        });
    }

    /**
     * Test if an email has no sign symbol.
     */
    @Test
    void noSignEmailRegisterTest() {
        registerDTO.setEmail("test.com");

        assertThrows(InvalidEmailException.class, () -> {
            AuthUtils.validateRegistration(registerDTO);
        });
    }

    /**
     * Test if an email has no letters.
     */
    @Test
    void noBodyEmailRegisterTest() {
        registerDTO.setEmail("@test.com");

        assertThrows(InvalidEmailException.class, () -> {
            AuthUtils.validateRegistration(registerDTO);
        });
    }

    /**
     * Tests if an registerDTO has no username provided.
     */
    @Test
    void noUsernameProvidedRegisterTest() {
        registerDTO.setUsername("");

        assertThrows(NoUsernameProvidedException.class, () -> {
            AuthUtils.validateRegistration(registerDTO);
        });
    }

    /**
     * Tests if an registerDTO has no password provided.
     */
    @Test
    void noPasswordProvidedRegisterTest() {
        registerDTO.setPassword("");

        assertThrows(NoPasswordProvidedException.class, () -> {
            AuthUtils.validateRegistration(registerDTO);
        });
    }

    /**
     * Tests if an registerDTO has whitespace username.
     */
    @Test
    void whitespaceUsernameRegisterTest() {
        registerDTO.setUsername("   ");

        assertThrows(NoUsernameProvidedException.class, () -> {
            AuthUtils.validateRegistration(registerDTO);
        });
    }

    /**
     * Tests if an registerDTO has whitespace password.
     */
    @Test
    void whitespacePasswordRegisterTest() {
        registerDTO.setPassword("   ");

        assertThrows(NoPasswordProvidedException.class, () -> {
            AuthUtils.validateRegistration(registerDTO);
        });
    }

    /**
     * Test if loginDTO is valid.
     */
    @Test
    void validLoginDTOTest() {
        AuthUtils.validateRegistration(registerDTO);
    }

    /**
     * Test if loginDTO has empty username.
     */
    @Test
    void emptyUsernameLoginTest() {
        loginDTO.setUsername("");

        assertThrows(NoUsernameProvidedException.class, () -> {
            AuthUtils.validateLogin(loginDTO);
        });
    }

    /**
     * Test if loginDTO has empty password.
     */
    @Test
    void emptyPasswordLoginTests() {
        loginDTO.setPassword("");

        assertThrows(NoPasswordProvidedException.class, () -> {
            AuthUtils.validateLogin(loginDTO);
        });
    }

    /**
     * Test if loginDTO has null username.
     */
    @Test
    void nullUsernameLoginTest() {
        loginDTO.setUsername(null);

        assertThrows(NoUsernameProvidedException.class, () -> {
            AuthUtils.validateLogin(loginDTO);
        });
    }

    /**
     * Test if loginDTO has null password.
     */
    @Test
    void nullPasswordLoginTests() {
        loginDTO.setPassword(null);

        assertThrows(NoPasswordProvidedException.class, () -> {
            AuthUtils.validateLogin(loginDTO);
        });
    }
}
