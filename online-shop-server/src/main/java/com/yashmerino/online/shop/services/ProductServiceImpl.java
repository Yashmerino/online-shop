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

import com.yashmerino.online.shop.model.Product;
import com.yashmerino.online.shop.model.User;
import com.yashmerino.online.shop.repositories.ProductRepository;
import com.yashmerino.online.shop.repositories.UserRepository;
import com.yashmerino.online.shop.services.interfaces.ProductService;
import com.yashmerino.online.shop.utils.Role;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Implementation for product service.
 */
@Service
public class ProductServiceImpl implements ProductService {

    /**
     * Product repository.
     */
    private final ProductRepository productRepository;

    /**
     * User repository.
     */
    private final UserRepository userRepository;

    /**
     * Constructor to inject dependencies.
     *
     * @param productRepository is the product repository.
     * @param userRepository    is the user repository.
     */
    public ProductServiceImpl(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    /**
     * Returns the product.
     *
     * @param id is the product's id.
     * @return <code>Optional of Product</code>.
     */
    @Override
    public Optional<Product> getProduct(Long id) {
        return productRepository.findById(id);
    }

    /**
     * Returns all the products.
     *
     * @return <code>List of Products</code>
     */
    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Saves a product.
     *
     * @param product is the product's object.
     * @return <code>Product</code>
     */
    @Override
    public void save(Product product) {
        productRepository.save(product);
    }

    /**
     * Deletes a product.
     *
     * @param id is the product's id.
     */
    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    /**
     * Returns seller's products.
     *
     * @param username is the seller's username.
     * @return List of Products.
     */
    @Override
    public List<Product> getSellerProducts(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Long userId = user.getId();

            return productRepository.getProductsBySellerId(userId);
        } else {
            throw new BadCredentialsException("Bad credentials.");
        }
    }
}
