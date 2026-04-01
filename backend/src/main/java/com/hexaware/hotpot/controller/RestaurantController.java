package com.hexaware.hotpot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hexaware.hotpot.entity.Restaurant;
import com.hexaware.hotpot.entity.Order;
import com.hexaware.hotpot.service.RestaurantService;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping("/add")
    public Restaurant addRestaurant(@RequestBody Restaurant restaurant) {
        return restaurantService.addRestaurant(restaurant);
    }

    @PostMapping("/login")
    public Restaurant loginRestaurant(@RequestParam String email,
                                      @RequestParam String password) {
        return restaurantService.loginRestaurant(email, password);
    }

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/{id}")
    public Restaurant getRestaurant(@PathVariable Integer id) {
        return restaurantService.getRestaurantById(id);
    }

    @GetMapping("/{id}/orders")
    public List<Order> getRestaurantOrders(@PathVariable Integer id) {
        return restaurantService.getRestaurantOrders(id);
    }

}