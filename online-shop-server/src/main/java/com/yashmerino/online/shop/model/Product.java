package com.yashmerino.online.shop.model;

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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.yashmerino.online.shop.model.base.BaseEntity;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

/**
 * JPA Entity for a product.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "products")
@Table(name = "products")
public class Product extends BaseEntity {

    /**
     * Product's name.
     */
    private String name;

    /**
     * Product's price.
     */
    private Double price;

    /**
     * Product's description;
     */
    private String description;

    /**
     * Product's categories.
     */
    @ManyToMany
    private Set<Category> categories;

    /**
     * Product's seller.
     */
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    /**
     * The cart items that belong to this product.
     */
    @JsonManagedReference
    @OneToMany(orphanRemoval = true)
    private Set<CartItem> cartItems = new HashSet<>();

    /**
     * Product's photo.
     */
    @Lob
    @Column(name = "photo", length = 100000)
    @Nullable
    private byte[] photo;

    /**
     * Links a cart item to the product.
     *
     * @param cartItem is the cart's item to link.
     */
    public void linkCartItem(CartItem cartItem) {
        this.cartItems.add(cartItem);
    }

    /**
     * Deletes a cart item from linked cart items.
     *
     * @param cartItem is the cart's item.
     */
    public void deleteCartItem(CartItem cartItem) {
        this.cartItems.remove(cartItem);
    }
}
