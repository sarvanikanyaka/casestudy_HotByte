package com.hexaware.hotpot.service;

import java.util.List;
import com.hexaware.hotpot.entity.Restaurant;
import com.hexaware.hotpot.entity.Order;

public interface RestaurantService {

    Restaurant addRestaurant(Restaurant restaurant);

    Restaurant loginRestaurant(String email, String password);

    List<Restaurant> getAllRestaurants();

    Restaurant getRestaurantById(Integer restaurantId);

    List<Order> getRestaurantOrders(Integer restaurantId);
}