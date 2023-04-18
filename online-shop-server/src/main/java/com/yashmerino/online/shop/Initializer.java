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
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;

/**
 * Class that initializes data.
 */
@Component
public class Initializer implements CommandLineRunner {

    /**
     * Customers' repository.
     */
    private final UserRepository userRepository;

    /**
     * Sellers' repository.
     */
    private final SellerRepository sellerRepository;

    /**
     * Carts' repository.
     */
    private final CartRepository cartRepository;

    /**
     * Cart items' repository.
     */
    private final CartItemRepository cartItemRepository;

    /**
     * Products' repository.
     */
    private final ProductRepository productRepository;

    /**
     * Categories' repository.
     */
    private final CategoryRepository categoryRepository;

    /**
     * Constructor.
     *
     * @param userRepository is the repository for customers.
     * @param sellerRepository   is the repository for sellers.
     * @param cartRepository     is the repository for carts.
     * @param cartItemRepository is the repository for cart items.
     * @param productRepository  is the repository for products.
     * @param categoryRepository is the repository for categories.
     */
    public Initializer(UserRepository userRepository, SellerRepository sellerRepository, CartRepository cartRepository, CartItemRepository cartItemRepository, ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.userRepository = userRepository;
        this.sellerRepository = sellerRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Category category = new Category();
        category.setId(1L);
        category.setName("Fruits");
        categoryRepository.save(category);

        Cart cart = new Cart();
        cart.setId(1L);
        cartRepository.save(cart);

        Seller seller = new Seller();
        seller.setId(1L);
        seller.setFirstName("Johny");
        seller.setLastName("Sins");
        sellerRepository.save(seller);

        Product product = new Product();
        product.setId(1L);
        product.setName("Apples");
        product.setPrice(500);
        product.setCategories(new HashSet<>(Arrays.asList(category)));
        product.setSeller(seller);
        productRepository.save(product);

        seller.setProducts(new HashSet<>(Arrays.asList(product)));
        sellerRepository.save(seller);

        CartItem item = new CartItem();
        item.setId(1L);
        item.setQuantity(5);
        item.setCart(cart);
        item.setProduct(product);
        cartItemRepository.save(item);

        cart.addItem(item);
        cartRepository.save(cart);

        User user = new User();
        user.setId(1L);
        user.setFirstName("John");
        user.setLastName("McGill");
        user.setCart(cart);

        userRepository.save(user);
    }
}
