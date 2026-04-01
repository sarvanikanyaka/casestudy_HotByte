package com.hexaware.hotpot.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.hexaware.hotpot.entity.Restaurant;

public class RestaurantServiceTest {

    @Test
    public void testRestaurantName() {

        Restaurant restaurant = new Restaurant();
        restaurant.setName("Paradise");

        assertEquals("Paradise", restaurant.getName());
    }

}