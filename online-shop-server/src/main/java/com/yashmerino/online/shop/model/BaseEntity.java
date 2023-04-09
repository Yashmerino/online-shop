package com.yashmerino.online.shop.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

/**
 * Parent class for JPA Entities
 */
@Getter
@Setter
@MappedSuperclass
public class BaseEntity {

    /**
     * Entity's id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
}
