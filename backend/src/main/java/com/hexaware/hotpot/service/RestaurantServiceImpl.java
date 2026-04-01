package com.hexaware.hotpot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.hotpot.entity.Restaurant;
import com.hexaware.hotpot.entity.Order;
import com.hexaware.hotpot.repository.RestaurantRepository;
import com.hexaware.hotpot.repository.OrderRepository;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Restaurant addRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant loginRestaurant(String email, String password) {
        return restaurantRepository.findAll()
                .stream()
                .filter(r -> r.getEmail().equals(email) && r.getPassword().equals(password))
                .findFirst()
                .orElse(null);
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public Restaurant getRestaurantById(Integer restaurantId) {
        return restaurantRepository.findById(restaurantId).orElse(null);
    }

    @Override
    public List<Order> getRestaurantOrders(Integer restaurantId) {
        return orderRepository.findAll()
                .stream()
                .filter(o -> o.getRestaurant().getRestaurantId().equals(restaurantId))
                .toList();
    }
}