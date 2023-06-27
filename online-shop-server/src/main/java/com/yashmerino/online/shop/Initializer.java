package com.yashmerino.online.shop;
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

import com.yashmerino.online.shop.model.*;
import com.yashmerino.online.shop.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;

/**
 * Initializer to initialize data.
 */
@Component
@Profile("!test")
public class Initializer implements CommandLineRunner {

    /**
     * Role repository;
     */
    private final RoleRepository roleRepository;

    /**
     * User repository.
     */
    private final UserRepository userRepository;

    /**
     * Product repository.
     */
    private final ProductRepository productRepository;

    /**
     * Cart item repository.
     */
    private final CartItemRepository cartItemRepository;

    /**
     * Cart repository.
     */
    private final CartRepository cartRepository;

    /**
     * Password encoder.
     */
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructor.
     *
     * @param roleRepository     is the role repository.
     * @param userRepository     is the user repository.
     * @param productRepository  is the product repository.
     * @param cartItemRepository is the cart item repository.
     * @param cartRepository     is the cart repository.
     * @param passwordEncoder    is the password encoder.
     */
    public Initializer(RoleRepository roleRepository, UserRepository userRepository, ProductRepository productRepository, CartItemRepository cartItemRepository, CartRepository cartRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Initializes data.
     *
     * @param args is the command line arguments.
     * @throws Exception when something goes wrong.
     */
    @Override
    @SuppressWarnings({"java:S3655", "java:S6437"})
    public void run(String... args) throws Exception {
        Role userRole = roleRepository.findByName("USER").get();
        Role sellerRole = roleRepository.findByName("SELLER").get();

        User user = new User();
        user.setId(1L);
        user.setUsername("user");
        user.setPassword(passwordEncoder.encode("user"));
        user.setRoles(new HashSet<>(Arrays.asList(userRole)));
        userRepository.save(user);

        Cart cart = new Cart();
        cart.setId(1L);
        cartRepository.save(cart);

        user.setCart(cart);
        userRepository.save(user);

        cart.setUser(user);
        cartRepository.save(cart);

        User seller = new User();
        seller.setId(2L);
        seller.setUsername("seller");
        seller.setPassword(passwordEncoder.encode("seller"));
        seller.setRoles(new HashSet<>(Arrays.asList(sellerRole)));
        userRepository.save(seller);

        Product product = new Product();
        product.setId(1L);
        product.setName("Apple");
        product.setPrice(2.50);
        product.setUser(seller);
        productRepository.save(product);

        CartItem cartItem = new CartItem();
        cartItem.setId(1L);
        cartItem.setCart(cart);
        cartItem.setName(product.getName());
        cartItem.setPrice(product.getPrice());
        cartItem.setProduct(product);
        cartItem.setQuantity(5);
        cartItemRepository.save(cartItem);

        product.linkCartItem(cartItem);
        productRepository.save(product);
    }
}
