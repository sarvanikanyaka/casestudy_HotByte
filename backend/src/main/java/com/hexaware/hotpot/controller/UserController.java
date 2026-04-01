package com.hexaware.hotpot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hexaware.hotpot.entity.User;
import com.hexaware.hotpot.entity.Order;
import com.hexaware.hotpot.service.UserService;
import com.hexaware.hotpot.util.JwtUtil;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

  
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existingUser = userService.loginUser(user.getEmail(), user.getPassword());

        if (existingUser == null) {
            throw new RuntimeException("Invalid credentials");
        }

        String role = existingUser.getRole();

        return jwtUtil.generateToken(existingUser.getEmail(), role);
    }
 
    @GetMapping("/{id}")
    public User getUser(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

    @GetMapping("/{id}/orders")
    public List<Order> getUserOrders(@PathVariable Integer id) {
        return userService.getUserOrders(id);
    }

}