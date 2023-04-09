package com.yashmerino.online.shop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

/**
 * JPA Entity for seller.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "sellers")
@Table(name = "sellers")
public class Seller extends NamedEntity {

    /**
     * Seller's products.
     */
    @OneToMany(mappedBy="id")
    private Set<Product> products;
}
