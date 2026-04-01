package com.hexaware.hotpot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.hotpot.entity.User;
import com.hexaware.hotpot.entity.Order;
import com.hexaware.hotpot.entity.Role;
import com.hexaware.hotpot.repository.UserRepository;
import com.hexaware.hotpot.repository.RoleRepository;
import com.hexaware.hotpot.repository.OrderRepository;
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User registerUser(User user) {
        user.setRole("ROLE_USER"); 

        return userRepository.save(user);
    }

    @Override
    public User loginUser(String email, String password) {
        return userRepository.findAll()
                .stream()
                .filter(u -> u.getEmail().equals(email) && u.getPassword().equals(password))
                .findFirst()
                .orElse(null);
    }

    @Override
    public User getUserById(Integer userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public List<Order> getUserOrders(Integer userId) {
        return orderRepository.findAll()
                .stream()
                .filter(o -> o.getUser().getUserId().equals(userId))
                .toList();
    }
}