package com.yashmerino.online.shop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private double price;

    /**
     * Product's categories.
     */
    @OneToMany(mappedBy = "id")
    private Set<Category> categories;

    /**
     * Product's seller.
     */
    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Seller seller;
}
