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

import com.yashmerino.online.shop.model.Cart;
import com.yashmerino.online.shop.model.CartItem;
import com.yashmerino.online.shop.model.Product;
import com.yashmerino.online.shop.model.User;
import com.yashmerino.online.shop.model.dto.ProductDTO;
import com.yashmerino.online.shop.services.interfaces.CartItemService;
import com.yashmerino.online.shop.services.interfaces.CartService;
import com.yashmerino.online.shop.services.interfaces.ProductService;
import com.yashmerino.online.shop.services.interfaces.UserService;
import com.yashmerino.online.shop.swagger.SwaggerConfig;
import com.yashmerino.online.shop.swagger.SwaggerHttpStatus;
import com.yashmerino.online.shop.swagger.SwaggerMessages;
import com.yashmerino.online.shop.utils.RequestBodyToEntityConverter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Product's controller.
 */
@Tag(name = "2. Products Controller", description = "These endpoints are used to perform actions on products.")
@SecurityRequirement(name = SwaggerConfig.SECURITY_SCHEME_NAME)
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
     * @throws EntityNotFoundException if user couldn't be found.
     */
    @Operation(summary = "Adds a new product.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = SwaggerHttpStatus.OK, description = SwaggerMessages.PRODUCT_SUCCESSFULLY_ADDED,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.BAD_REQUEST, description = SwaggerMessages.BAD_REQUEST,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.FORBIDDEN, description = SwaggerMessages.FORBIDDEN,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.UNAUTHORIZED, description = SwaggerMessages.UNAUTHORIZED,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.INTERNAL_SERVER_ERROR, description = SwaggerMessages.INTERNAL_SERVER_ERROR,
                    content = @Content)})
    @PostMapping
    public ResponseEntity<String> addProduct(@RequestBody ProductDTO productDTO) {
        Product product = RequestBodyToEntityConverter.convertToProduct(productDTO);

        Optional<User> userOptional = userService.getById(productDTO.getUserId());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            product.setUser(user);
            productService.save(product);

            return new ResponseEntity<>("Product successfully added!", HttpStatus.OK);
        } else {
            throw new EntityNotFoundException("User couldn't be found!");
        }
    }

    /**
     * Adds a product to the cart.
     *
     * @param id       is the product's id.
     * @param cartId   is the cart's id.
     * @param quantity is the quantity of item.
     * @return <code>ResponseEntity</code>
     * @throws EntityNotFoundException if product or cart couldn't be found.
     */
    @Operation(summary = "Adds a product to the cart.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = SwaggerHttpStatus.OK, description = SwaggerMessages.ITEM_SUCCESSFULLY_ADDED,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.BAD_REQUEST, description = SwaggerMessages.BAD_REQUEST,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.FORBIDDEN, description = SwaggerMessages.FORBIDDEN,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.UNAUTHORIZED, description = SwaggerMessages.UNAUTHORIZED,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.INTERNAL_SERVER_ERROR, description = SwaggerMessages.INTERNAL_SERVER_ERROR,
                    content = @Content)})
    @GetMapping("/{id}/add")
    public ResponseEntity<String> addProductToCart(@PathVariable Long id, @RequestParam Long cartId, @RequestParam Integer quantity) {
        Optional<Product> productOptional = productService.getProduct(id);

        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            Optional<Cart> optionalCart = cartService.getCart(cartId);

            if (optionalCart.isPresent()) {
                Cart cart = optionalCart.get();

                CartItem cartItem = new CartItem();
                cartItem.setCart(cart);
                cartItem.setProduct(product);
                cartItem.setQuantity(quantity);
                cartItemService.save(cartItem);

                return new ResponseEntity<>("Product successfully added!", HttpStatus.OK);
            } else {
                throw new EntityNotFoundException("Cart couldn't be found!");
            }
        } else {
            throw new EntityNotFoundException("Product couldn't be found!");
        }
    }

    /**
     * Returns a product.
     *
     * @param id is the product's id.
     * @return <code>ResponseEntity</code>
     * @throws EntityNotFoundException if cart item couldn't be found.
     */
    @Operation(summary = "Returns a product.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = SwaggerHttpStatus.OK, description = SwaggerMessages.RETURN_PRODUCT,
                    content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ProductDTO.class))}),
            @ApiResponse(responseCode = SwaggerHttpStatus.BAD_REQUEST, description = SwaggerMessages.BAD_REQUEST,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.FORBIDDEN, description = SwaggerMessages.FORBIDDEN,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.UNAUTHORIZED, description = SwaggerMessages.UNAUTHORIZED,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.INTERNAL_SERVER_ERROR, description = SwaggerMessages.INTERNAL_SERVER_ERROR,
                    content = @Content)})
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
        Optional<Product> product = productService.getProduct(id);

        if (product.isPresent()) {
            ProductDTO productDTO = RequestBodyToEntityConverter.convertToProductDTO(product.get());
            return new ResponseEntity<>(productDTO, HttpStatus.OK);
        } else {
            throw new EntityNotFoundException("Product couldn't be found!");
        }
    }

    /**
     * Returns all the products.
     *
     * @return <code>List of ProductDTOs</code>.
     */
    @Operation(summary = "Returns all the products.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = SwaggerHttpStatus.OK, description = SwaggerMessages.RETURN_PRODUCTS,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.BAD_REQUEST, description = SwaggerMessages.BAD_REQUEST,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.FORBIDDEN, description = SwaggerMessages.FORBIDDEN,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.UNAUTHORIZED, description = SwaggerMessages.UNAUTHORIZED,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.INTERNAL_SERVER_ERROR, description = SwaggerMessages.INTERNAL_SERVER_ERROR,
                    content = @Content)})
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        List<ProductDTO> productsDTO = new ArrayList<>();

        for (Product product : products) {
            productsDTO.add(RequestBodyToEntityConverter.convertToProductDTO(product));
        }

        return new ResponseEntity<>(productsDTO, HttpStatus.OK);
    }
}
