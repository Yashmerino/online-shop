package com.yashmerino.online.shop.model;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

/**
 * Base named entity.
 */
@Getter
@Setter
@MappedSuperclass
public class NamedEntity extends BaseEntity{
    /**
     * Entity's first name.
     */
    private String firstName;

    /**
     * Entity's last name.
     */
    private String lastName;
}
