package com.yashmerino.online.shop.selenium.it;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static com.yashmerino.online.shop.selenium.it.utils.SeleniumProperties.CHROME_DRIVER_PROPERTY;

/**
 * Base selenium integration test.
 */
public class BaseIT {

    /**
     * Path to the chrome driver.
     */
    protected String CHROME_DRIVER_PATH = "src/test/resources/chromedriver.exe";

    /**
     * Web Driver to execute browser actions.
     */
    protected WebDriver driver;

    /**
     * Constructor.
     */
    public BaseIT() {
        System.setProperty(CHROME_DRIVER_PROPERTY, CHROME_DRIVER_PATH);

        driver = new ChromeDriver();
    }
}
