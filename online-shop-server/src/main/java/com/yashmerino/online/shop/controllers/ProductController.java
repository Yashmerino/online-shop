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
import com.yashmerino.online.shop.model.Product;
import com.yashmerino.online.shop.model.dto.ProductDTO;
import com.yashmerino.online.shop.services.interfaces.CartItemService;
import com.yashmerino.online.shop.services.interfaces.CartService;
import com.yashmerino.online.shop.services.interfaces.ProductService;
import com.yashmerino.online.shop.services.interfaces.UserService;
import com.yashmerino.online.shop.utils.RequestBodyToEntityConverter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Product's controller.
 */
@RestController
@RequestMapping("/api/product")
public class ProductController {

    /**
     * Products' service.
     */
    private final ProductService productService;

    /**
     * Cart items' service.
     */
    private final CartItemService cartItemService;

    /**
     * Carts' service.
     */
    private final CartService cartService;

    /**
     * Users' service.
     */
    private final UserService userService;

    /**
     * Constructor.
     *
     * @param productService  is the products' service.
     * @param cartItemService is the cart items' service.
     * @param cartService     is the carts' service.
     * @param userService     is the users' service
     */
    public ProductController(ProductService productService, CartItemService cartItemService, CartService cartService, UserService userService) {
        this.productService = productService;
        this.cartItemService = cartItemService;
        this.cartService = cartService;
        this.userService = userService;
    }

    /**
     * Adds a product.
     *
     * @param productDTO is the product DTO.
     * @return <code>ResponseEntity</code>
     */
    @PostMapping("/{id}")
    public ResponseEntity addProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        Product product = RequestBodyToEntityConverter.convertToProduct(productDTO);
        product.setUser(userService.getById(productDTO.getUserId()).get());

        productService.save(product);

        return new ResponseEntity("Product successfully added!", HttpStatus.OK);
    }

    /**
     * Adds a product to the cart.
     *
     * @param id       is the product's id.
     * @param cartId   is the cart's id.
     * @param quantity is the quantity of item.
     * @return <code>ResponseEntity</code>
     */
    @PostMapping("/{id}/add")
    public ResponseEntity addProductToCart(@PathVariable Long id, @RequestParam Long cartId, @RequestParam Integer quantity) {
        Product product = productService.getProduct(id).get();

        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setCart(cartService.getCart(cartId).get());
        cartItem.setQuantity(quantity);

        cartItemService.save(cartItem);

        return new ResponseEntity("Product successfully added!", HttpStatus.OK);
    }
}
