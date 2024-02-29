package com.yashmerino.online.shop.selenium.it.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Base Page for Page Object Model.
 */
public class BasePage {

    /**
     * Web Driver to make browser actions.
     */
    protected WebDriver driver;

    /**
     * Wait web driver to wait until certain conditions met.
     */
    protected WebDriverWait wait;

    /**
     * Success alert element.
     */
    protected By successAlert = By.id("alert-success");

    /**
     * Constructor.
     *
     * @param driver web driver to perform browser actions.
     * @param wait   wait web driver to wait until certain conditions met.
     */
    public BasePage(final WebDriver driver, final WebDriverWait wait) {
        this.driver = driver;
        this.wait = wait;
    }
}
