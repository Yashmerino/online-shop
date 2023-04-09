package com.yashmerino.online.shop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

/**
 * JPA Entity for cart that holds products.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "carts")
@Table(name = "carts")
public class Cart extends BaseEntity {

    /**
     * Cart's items.
     */
    @OneToMany(mappedBy = "cart")
    private Set<CartItem> items;

    /**
     * Customer of the cart.
     */
    @OneToOne(mappedBy = "cart")
    private Customer customer;

    /**
     * Adds an item to the cart.
     *
     * @param item is the item to add.
     */
    public void addItem(final CartItem item) {
        this.items.add(item);
    }

    /**
     * Adds item to the cart.
     *
     * @param items is the list of items to add.
     */
    public void addItems(final CartItem... items) {
        for (var item : items) {
            this.addItem(item);
        }
    }

    /**
     * Removes an item from the cart.
     *
     * @param itemId is the item's id to remove.
     */
    public void removeItem(final Long itemId) {
        this.items.removeIf(item -> item.getId().equals(itemId));
    }

    /**
     * Removes items from the card.
     *
     * @param itemsIds is the list of items' ids to remove.
     */
    public void removeItems(final Long... itemsIds) {
        for (var itemId : itemsIds) {
            this.removeItem(itemId);
        }
    }
}
