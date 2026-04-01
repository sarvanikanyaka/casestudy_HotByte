package com.hexaware.hotpot.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import com.hexaware.hotpot.entity.Order;

public class OrderServiceTest {

    @Test
    public void testOrderCreation() {

        Order order = new Order();

        assertNotNull(order);
    }

}