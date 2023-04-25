package com.yashmerino.online.shop.exceptions;
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

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Controler advice that handles thrown exceptions in API requests.
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    /**
     * Handles the {@link EmailAlreadyTakenException}
     *
     * @param e is the thrown exception.
     * @return <code>ResponseEntity</code>
     */
    @ExceptionHandler(value = {EmailAlreadyTakenException.class})
    @ResponseStatus(value = HttpStatus.CONFLICT)
    public ResponseEntity emailAlreadyTakenExceptionHandler(EmailAlreadyTakenException e) {
        return new ResponseEntity<>("The email is already taken!", HttpStatus.CONFLICT);
    }

    /**
     * Handles the {@link InvalidEmailException}
     *
     * @param e is the thrown exception.
     * @return <code>ResponseEntity</code>
     */
    @ExceptionHandler(value = {InvalidEmailException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseEntity invalidEmailExceptionHandler(InvalidEmailException e) {
        return new ResponseEntity<>("The email is invalid!", HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles the {@link InvalidInputException}
     *
     * @param e is the thrown exception.
     * @return <code>ResponseEntity</code>
     */
    @ExceptionHandler(value = {InvalidInputException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseEntity invalidInputExceptionHandler(InvalidInputException e) {
        return new ResponseEntity<>("The input is invalid", HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles the {@link InvalidPasswordException}
     *
     * @param e is the thrown exception.
     * @return <code>ResponseEntity</code>
     */
    @ExceptionHandler(value = {InvalidPasswordException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseEntity invalidPasswordExceptionHandler(InvalidPasswordException e) {
        return new ResponseEntity<>("The password is invalid", HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles the {@link InvalidUsernameException}
     *
     * @param e is the thrown exception.
     * @return <code>ResponseEntity</code>
     */
    @ExceptionHandler(value = {InvalidUsernameException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseEntity invalidUsernameExceptionHandler(InvalidUsernameException e) {
        return new ResponseEntity<>("The username is invalid", HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles the {@link NoEmailProvidedException}
     *
     * @param e is the thrown exception.
     * @return <code>ResponseEntity</code>
     */
    @ExceptionHandler(value = {NoEmailProvidedException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseEntity noEmailProvidedExceptionHandler(NoEmailProvidedException e) {
        return new ResponseEntity<>("Email field is not provided!", HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles the {@link NoPasswordProvidedException}
     *
     * @param e is the thrown exception.
     * @return <code>ResponseEntity</code>
     */
    @ExceptionHandler(value = {NoPasswordProvidedException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseEntity noPasswordProvidedExceptionHandler(NoPasswordProvidedException e) {
        return new ResponseEntity<>("Password field is not provided!", HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles the {@link NoUsernameProvidedException}
     *
     * @param e is the thrown exception.
     * @return <code>ResponseEntity</code>
     */
    @ExceptionHandler(value = {NoUsernameProvidedException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseEntity noUsernameProvidedExceptionHandler(NoUsernameProvidedException e) {
        return new ResponseEntity<>("Username field is not provided!", HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles the {@link UserDoesntExistException}
     *
     * @param e is the thrown exception.
     * @return <code>ResponseEntity</code>
     */
    @ExceptionHandler(value = {UserDoesntExistException.class})
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ResponseEntity userDoesntExistExceptionHandler(UserDoesntExistException e) {
        return new ResponseEntity<>("User doesn't exist!", HttpStatus.NOT_FOUND);
    }

    /**
     * Handles the {@link UsernameAlreadyTakenException}
     *
     * @param e is the thrown exception.
     * @return <code>ResponseEntity</code>
     */
    @ExceptionHandler(value = {UsernameAlreadyTakenException.class})
    @ResponseStatus(value = HttpStatus.CONFLICT)
    public ResponseEntity usernameAlreadyTakenExceptionHandler(UsernameAlreadyTakenException e) {
        return new ResponseEntity<>("Username is already taken!", HttpStatus.CONFLICT);
    }
}
