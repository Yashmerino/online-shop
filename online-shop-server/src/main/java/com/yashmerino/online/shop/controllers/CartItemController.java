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

import com.yashmerino.online.shop.model.CartItem;
import com.yashmerino.online.shop.services.interfaces.CartItemService;
import com.yashmerino.online.shop.services.interfaces.CartService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Cart item's controller.
 */
@RestController
@RequestMapping("/api/cartItem")
public class CartItemController {

    /**
     * Cart items' service.
     */
    private final CartItemService cartItemService;

    /**
     * Cart's service.
     */
    private final CartService cartService;

    /**
     * Constructor.
     *
     * @param cartItemService is the cart items' service.
     * @param cartService     is the cart's service.
     */
    public CartItemController(CartItemService cartItemService, CartService cartService) {
        this.cartItemService = cartItemService;
        this.cartService = cartService;
    }

    /**
     * Adds a cart item.
     *
     * @param id is the cart item's id.
     * @return <code>ResponseEntity</code>
     */
    @PostMapping("/{id}/delete")
    public ResponseEntity deleteCartItem(@PathVariable Long id) {
        cartItemService.deleteCartItem(id);

        return new ResponseEntity<>("Item successfully deleted!", HttpStatus.OK);
    }

    /**
     * Change the quantity of a cart's item.
     *
     * @param id is the cart item's id.
     * @return <code>ResponseEntity</code>
     */
    @PostMapping("/{id}/quantity")
    public ResponseEntity changeQuantity(@PathVariable Long id, @RequestParam Integer quantity) {
        cartItemService.changeQuantity(id, quantity);

        return new ResponseEntity<>("Item's quantity successfully changed!", HttpStatus.OK);
    }

    /**
     * Returns a cart item.
     *
     * @param id is the cart item's id.
     * @return <code>ResponseEntity</code>
     */
    @GetMapping("/{id}")
    public ResponseEntity getCartItem(@PathVariable Long id) {
        Optional<CartItem> cartItem = cartItemService.getCartItem(id);

        if (!cartItem.isPresent()) {
            throw new EntityNotFoundException();
        }

        return new ResponseEntity<>(cartItem.get(), HttpStatus.OK);
    }
}
