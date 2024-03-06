package com.yashmerino.online.shop.selenium.it.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Base class for pages that have the header component.
 */
public class BaseHeaderPage extends BasePage {
    /**
     * My Profile header button.
     */
    private final By profileButton = By.id("profile-button");

    /**
     * My Cart header button.
     */
    private final By myCartButton = By.id("my-cart-button");

    /**
     * My Products header button.
     */
    private final By myProductsButton = By.id("my-products-button");

    /**
     * Add Product header button.
     */
    private final By addProductsButton = By.id("add-products-button");

    /**
     * Constructor.
     *
     * @param driver web driver to perform browser actions.
     * @param wait   wait web driver to wait until certain conditions met.
     */
    public BaseHeaderPage(WebDriver driver, WebDriverWait wait) {
        super(driver, wait);
    }
}
