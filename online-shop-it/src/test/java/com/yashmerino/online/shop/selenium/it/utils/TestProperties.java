package com.yashmerino.online.shop.selenium.it.utils;

import lombok.extern.slf4j.Slf4j;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

/**
 * Class for test properties.
 */
@Slf4j
public class TestProperties {

    /**
     * File that stores properties.
     */
    private final static String PROPERTIES_FILE = "src/test/resources/it-test.properties";

    /**
     * Properties.
     */
    private final static Properties properties = new Properties();

    /**
     * Database's url property name.
     */
    public final static String DB_URL = "db.url";

    /**
     * Database's username property name.
     */
    public final static String DB_USERNAME = "db.username";

    /**
     * Database's password property name.
     */
    public final static String DB_PASSWORD = "db.password";

    static {
        try {
            properties.load(new FileInputStream(PROPERTIES_FILE));
        } catch (IOException e) {
            if (log.isErrorEnabled()) {
                log.error("Test properties couldn't be read: ", e);
            }
        }
    }

    /**
     * Returns the property.
     *
     * @param propertyName is the property's name.
     * @return The property value.
     */
    public static String getProperty(final String propertyName) {
        return properties.getProperty(propertyName);
    }
}
