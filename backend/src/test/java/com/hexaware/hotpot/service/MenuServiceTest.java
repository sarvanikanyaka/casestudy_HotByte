package com.hexaware.hotpot.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.hexaware.hotpot.entity.Menu;

public class MenuServiceTest {

    @Test
    public void testMenuCreation() {

        Menu menu = new Menu();
        menu.setItemName("Biryani");

        assertNotNull(menu);
    }

    @Test
    public void testMenuName() {

        Menu menu = new Menu();
        menu.setItemName("Pizza");

        assertEquals("Pizza", menu.getItemName());
    }

}