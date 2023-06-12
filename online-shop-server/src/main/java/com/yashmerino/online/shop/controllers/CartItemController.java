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
import com.yashmerino.online.shop.model.User;
import com.yashmerino.online.shop.model.dto.CartItemDTO;
import com.yashmerino.online.shop.model.dto.SuccessDTO;
import com.yashmerino.online.shop.services.interfaces.CartItemService;
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
import java.util.Set;

/**
 * Cart item's controller.
 */
@Tag(name = "3. Cart Items Controller", description = "These endpoints are used to perform actions on cart items.")
@SecurityRequirement(name = SwaggerConfig.SECURITY_SCHEME_NAME)
@RestController
@RequestMapping("/api/cartItem")
public class CartItemController {

    /**
     * Cart items' service.
     */
    private final CartItemService cartItemService;

    /**
     * Users' service.
     */
    private final UserService userService;

    /**
     * Constructor.
     *
     * @param cartItemService is the cart items' service.
     * @param userService     is the user's service.
     */
    public CartItemController(CartItemService cartItemService, UserService userService) {
        this.cartItemService = cartItemService;
        this.userService = userService;
    }

    /**
     * Adds a cart item.
     *
     * @param id is the cart item's id.
     * @return <code>ResponseEntity</code>
     */
    @Operation(summary = "Deletes a cart item.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = SwaggerHttpStatus.OK, description = SwaggerMessages.ITEM_SUCCESSFULLY_DELETED,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.BAD_REQUEST, description = SwaggerMessages.BAD_REQUEST,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.FORBIDDEN, description = SwaggerMessages.FORBIDDEN,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.UNAUTHORIZED, description = SwaggerMessages.UNAUTHORIZED,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.INTERNAL_SERVER_ERROR, description = SwaggerMessages.INTERNAL_SERVER_ERROR,
                    content = @Content)})
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Long id) {
        cartItemService.deleteCartItem(id);

        return new ResponseEntity<>("Item successfully deleted!", HttpStatus.OK);
    }

    /**
     * Change the quantity of a cart's item.
     *
     * @param id is the cart item's id.
     * @return <code>ResponseEntity</code>
     */
    @Operation(summary = "Changes the quantity of an item in the cart.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = SwaggerHttpStatus.OK, description = SwaggerMessages.QUANTITY_SUCCESSFULLY_CHANGED,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.BAD_REQUEST, description = SwaggerMessages.BAD_REQUEST,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.FORBIDDEN, description = SwaggerMessages.FORBIDDEN,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.UNAUTHORIZED, description = SwaggerMessages.UNAUTHORIZED,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.INTERNAL_SERVER_ERROR, description = SwaggerMessages.INTERNAL_SERVER_ERROR,
                    content = @Content)})
    @PostMapping("/{id}/quantity")
    public ResponseEntity<SuccessDTO> changeQuantity(@PathVariable Long id, @RequestParam Integer quantity) {
        cartItemService.changeQuantity(id, quantity);

        SuccessDTO successDTO = new SuccessDTO();
        successDTO.setStatus(200);
        successDTO.setMessage("Quantity of the item successfully changed!");

        return new ResponseEntity<>(successDTO, HttpStatus.OK);
    }

    /**
     * Returns a cart item.
     *
     * @param id is the cart item's id.
     * @return <code>ResponseEntity</code>
     * @throws EntityNotFoundException if cart item couldn't be found.
     */
    @Operation(summary = "Returns an item from the cart.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = SwaggerHttpStatus.OK, description = SwaggerMessages.RETURNED_CART_ITEM,
                    content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = CartItemDTO.class))}),
            @ApiResponse(responseCode = SwaggerHttpStatus.BAD_REQUEST, description = SwaggerMessages.BAD_REQUEST,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.FORBIDDEN, description = SwaggerMessages.FORBIDDEN,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.UNAUTHORIZED, description = SwaggerMessages.UNAUTHORIZED,
                    content = @Content),
            @ApiResponse(responseCode = SwaggerHttpStatus.INTERNAL_SERVER_ERROR, description = SwaggerMessages.INTERNAL_SERVER_ERROR,
                    content = @Content)})
    @GetMapping("/{id}")
    public ResponseEntity<CartItemDTO> getCartItem(@PathVariable Long id) {
        Optional<CartItem> cartItemOptional = cartItemService.getCartItem(id);

        if (cartItemOptional.isPresent()) {
            CartItem cartItem = cartItemOptional.get();
            CartItemDTO cartItemDTO = RequestBodyToEntityConverter.convertToCartItemDTO(cartItem);
            return new ResponseEntity<>(cartItemDTO, HttpStatus.OK);
        } else {
            throw new EntityNotFoundException("Cart Item couldn't be found!");
        }
    }

    /**
     * Returns all the cart items.
     *
     * @param username is the user's username.
     * @return <code>List of CartItems</code>
     */
    @Operation(summary = "Returns all the items from the cart.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = SwaggerHttpStatus.OK, description = SwaggerMessages.RETURNED_CART_ITEM,
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
    public List<CartItemDTO> getCartItems(@RequestParam String username) {
        Optional<User> userOptional = userService.getByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Cart cart = user.getCart();

            Set<CartItem> cartItemsSet = cart.getItems();
            List<CartItemDTO> cartItems = new ArrayList<>();

            for (CartItem cartItem : cartItemsSet) {
                cartItems.add(RequestBodyToEntityConverter.convertToCartItemDTO(cartItem));
            }

            return cartItems;
        } else {
            throw new EntityNotFoundException("User not found!");
        }
    }
}
