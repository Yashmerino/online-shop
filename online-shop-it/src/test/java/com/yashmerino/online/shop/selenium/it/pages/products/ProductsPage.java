package com.yashmerino.online.shop.selenium.it.pages.products;

import com.yashmerino.online.shop.selenium.it.pages.BaseHeaderPage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Page Object Model that represents products page.
 */
public class ProductsPage extends BaseHeaderPage {

    /**
     * Constructor.
     *
     * @param driver web driver to perform browser actions.
     * @param wait   wait web driver to wait until certain conditions met.
     */
    public ProductsPage(final WebDriver driver, final WebDriverWait wait) {
        super(driver, wait);
    }

    /**
     * Adds a product to the card.
     *
     * @param productId is the product's id.
     */
    public void addProductToCard(final String productId) {
        driver.findElement(By.id("add-product-" + productId)).click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(successAlert));
    }
}
