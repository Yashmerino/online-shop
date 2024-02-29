package com.yashmerino.online.shop.selenium.it;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static com.yashmerino.online.shop.selenium.it.utils.SeleniumProperties.CHROME_DRIVER_PROPERTY;

/**
 * Base selenium integration test.
 */
public class BaseIT {

    /**
     * Timeout in seconds.
     */
    private final Duration TIMEOUT_IN_SECONDS = Duration.ofSeconds(30);

    /**
     * Path to the chrome driver.
     */
    protected String CHROME_DRIVER_PATH = "src/test/resources/chromedriver.exe";

    /**
     * Web Driver to execute browser actions.
     */
    protected WebDriver driver;

    /**
     * Wait web driver to wait until certain conditions met.
     */
    protected WebDriverWait wait;

    /**
     * Constructor.
     */
    public BaseIT() {
        System.setProperty(CHROME_DRIVER_PROPERTY, CHROME_DRIVER_PATH);

        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, TIMEOUT_IN_SECONDS);
    }
}
