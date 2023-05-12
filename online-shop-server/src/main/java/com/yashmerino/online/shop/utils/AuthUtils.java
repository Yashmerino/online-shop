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

import com.yashmerino.online.shop.controllers.AuthController;
import com.yashmerino.online.shop.exceptions.InvalidEmailException;
import com.yashmerino.online.shop.exceptions.NoEmailProvidedException;
import com.yashmerino.online.shop.exceptions.NoPasswordProvidedException;
import com.yashmerino.online.shop.exceptions.NoUsernameProvidedException;
import com.yashmerino.online.shop.model.dto.auth.LoginDTO;
import com.yashmerino.online.shop.model.dto.auth.RegisterDTO;

import java.util.regex.Pattern;

/**
 * Utils class for {@link AuthController}
 */
public class AuthUtils {

    /**
     * Private constructor to now allow instantiation.
     */
    private AuthUtils() {

    }

    /**
     * Regex to check if an email is valid.
     */
    @SuppressWarnings("java:S5998")
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\." +
            "[a-zA-Z0-9_+&*-]+)*@" +
            "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
            "A-Z]{2,7}$";

    /**
     * Regex pattern object that checks if an email is valid.
     */
    private static final Pattern emailRegexPattern = Pattern.compile(EMAIL_REGEX);

    /**
     * Method that validates the registration process and throws exceptions in case it's invalid.
     */
    public static void validateRegistration(final RegisterDTO registerDto) {
        areMandatoryRegistrationFieldsEmpty(registerDto);
        isEmailValid(registerDto.getEmail());
    }

    /**
     * Method that validates the login process and throws exceptions in case it's invalid.
     */
    public static void validateLogin(final LoginDTO loginDTO) {
        areMandatoryLoginFieldsEmpty(loginDTO);
    }

    /**
     * Checks if mandatory registration fields are empty.
     *
     * @param registerDto is the register credentials.
     */
    private static void areMandatoryRegistrationFieldsEmpty(final RegisterDTO registerDto) {
        final String email = registerDto.getEmail();
        final String username = registerDto.getUsername();
        final String password = registerDto.getPassword();

        if (email == null || email.trim().isEmpty()) {
            throw new NoEmailProvidedException("Email field not provided!");
        } else if (username == null || username.trim().isEmpty()) {
            throw new NoUsernameProvidedException("Username field not provided!");
        } else if (password == null || password.trim().isEmpty()) {
            throw new NoPasswordProvidedException("Password field not provided!");
        }
    }

    /**
     * Checks if an email is valid.
     *
     * @param email - user's email.
     */
    private static void isEmailValid(final String email) {
        if (email == null) {
            throw new NoEmailProvidedException("Email field not provided!");
        }

        if (!emailRegexPattern.matcher(email).matches()) {
            throw new InvalidEmailException("Email field is invalid!");
        }
    }

    /**
     * Checks if mandatory login fields are empty.
     *
     * @param loginDTO is the register credentials.
     */
    private static void areMandatoryLoginFieldsEmpty(final LoginDTO loginDTO) {
        final String username = loginDTO.getUsername();
        final String password = loginDTO.getPassword();

        if (username == null || username.trim().isEmpty()) {
            throw new NoUsernameProvidedException("Username field not provided!");
        } else if (password == null || password.trim().isEmpty()) {
            throw new NoPasswordProvidedException("Password field not provided!");
        }
    }
}
