package com.yashmerino.online.shop.services;

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

import com.yashmerino.online.shop.model.Cart;
import com.yashmerino.online.shop.model.CartItem;
import com.yashmerino.online.shop.model.Product;
import com.yashmerino.online.shop.model.User;
import com.yashmerino.online.shop.repositories.CartItemRepository;
import com.yashmerino.online.shop.repositories.UserRepository;
import com.yashmerino.online.shop.services.interfaces.CartItemService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

/**
 * Implementation for cart item service.
 */
@Service
public class CartItemServiceImpl implements CartItemService {

    /**
     * Cart Item repository.
     */
    private final CartItemRepository cartItemRepository;

    /**
     * User repository.
     */
    private final UserRepository userRepository;

    /**
     * Access denied message translation key.
     */
    private final String ACCESS_DENIED_MESSAGE = "access_denied";

    /**
     * Cart item not found message translation key.
     */
    private final String CART_ITEM_NOT_FOUND_MESSAGE = "cartitem_not_found";

    /**
     * Constructor to inject dependencies.
     *
     * @param cartItemRepository is the cart item repository.
     * @param userRepository     is the user repository.
     */
    public CartItemServiceImpl(CartItemRepository cartItemRepository, UserRepository userRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
    }

    /**
     * Deletes a cart item.
     *
     * @param id is the cart item's id.
     */
    @Override
    public void deleteCartItem(final Long id) {
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(id);

        if (cartItemOptional.isPresent()) {
            CartItem cartItem = cartItemOptional.get();

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String currentUserUsername = auth.getName();

            if (!cartItem.getCart().getUser().getUsername().equals(currentUserUsername)) {
                throw new AccessDeniedException(ACCESS_DENIED_MESSAGE);
            }

            Product product = cartItem.getProduct();
            product.deleteCartItem(cartItem);
        } else {
            throw new EntityNotFoundException(CART_ITEM_NOT_FOUND_MESSAGE);
        }

        cartItemRepository.deleteById(id);
    }

    /**
     * Changes the quantity of a cart item.
     *
     * @param id       is the cart item's id.
     * @param quantity is the cart item's quantity.
     */
    @Override
    public void changeQuantity(final Long id, final Integer quantity) {
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(id);

        if (cartItemOptional.isPresent()) {
            CartItem cartItem = cartItemOptional.get();

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String currentUserUsername = auth.getName();

            if (!cartItem.getCart().getUser().getUsername().equals(currentUserUsername)) {
                throw new AccessDeniedException(ACCESS_DENIED_MESSAGE);
            }

            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);
        } else {
            throw new EntityNotFoundException(CART_ITEM_NOT_FOUND_MESSAGE);
        }
    }

    /**
     * Returns a cart item.
     *
     * @param id is the cart item's id.
     * @return <code>CartItem</code>
     */
    @Override
    public CartItem getCartItem(final Long id) {
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(id);

        if (cartItemOptional.isPresent()) {
            CartItem cartItem = cartItemOptional.get();

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String currentUserUsername = auth.getName();

            if (!cartItem.getCart().getUser().getUsername().equals(currentUserUsername)) {
                throw new AccessDeniedException(ACCESS_DENIED_MESSAGE);
            }

            return cartItem;
        } else {
            throw new EntityNotFoundException(CART_ITEM_NOT_FOUND_MESSAGE);
        }
    }

    /**
     * Returns all the cart items.
     *
     * @param username is the user's username.
     * @return <code>Set of CartItem</code>
     */
    @Override
    public Set<CartItem> getCartItems(final String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Cart cart = user.getCart();

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String currentUserUsername = auth.getName();

            if (!user.getUsername().equals(currentUserUsername)) {
                throw new AccessDeniedException(ACCESS_DENIED_MESSAGE);
            }

            return cart.getItems();
        } else {
            throw new EntityNotFoundException(CART_ITEM_NOT_FOUND_MESSAGE);
        }
    }

    /**
     * Saves cart item.
     *
     * @param cartItem is the cart item.
     */
    @Override
    public void save(final CartItem cartItem) {
        cartItemRepository.save(cartItem);
    }
}
