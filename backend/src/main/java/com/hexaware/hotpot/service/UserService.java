package com.hexaware.hotpot.service;

import java.util.List;
import com.hexaware.hotpot.entity.User;
import com.hexaware.hotpot.entity.Order;

public interface UserService {

    User registerUser(User user);

    User loginUser(String email, String password);

    User getUserById(Integer userId);

    List<Order> getUserOrders(Integer userId);
}