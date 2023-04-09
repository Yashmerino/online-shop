package com.yashmerino.online.shop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * JPA Entity for category.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "categories")
@Table(name = "categories")
public class Category extends BaseEntity {
    /**
     * Category's name.
     */
    private String name;
}
