package com.yashmerino.online.shop.security;

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

/**
 * Constant values for security configuration.
 */
public class SecurityConstants {

    /**
     * Time after which JWT token expires.
     */
    public static final long JWT_EXPIRATION = 700000;

    /**
     * JWT Secret.
     */
    public static final String JWT_SECRET = "640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316";

    /**
     * Bearer part from the auth header.
     */
    public static final String JWT_HEADER = "Bearer ";

    /**
     * Auth header.
     */
    public static final String AUTH_HEADER = "Authorization";

    /**
     * Private constructor to not allow instantiation.
     */
    private SecurityConstants() {

    }
}
