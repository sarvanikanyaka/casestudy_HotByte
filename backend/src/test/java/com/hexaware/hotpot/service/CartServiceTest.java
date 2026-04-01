package com.hexaware.hotpot.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.hexaware.hotpot.entity.CartItem;

public class CartServiceTest {

    @Test
    public void testCartItemQuantity() {

        CartItem item = new CartItem();
        item.setQuantity(3);

        assertEquals(3, item.getQuantity());
    }

}