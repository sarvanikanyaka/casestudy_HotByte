package com.hexaware.hotpot.controller;

import com.hexaware.hotpot.entity.Order;
import com.hexaware.hotpot.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private OrderService orderService;

   
    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

  
    @PutMapping("/orders/{id}")
    public Order updateStatus(@PathVariable int id, @RequestParam String status) {
        return orderService.updateOrderStatus(id, status);
    }

    @DeleteMapping("/orders/{id}")
    public String deleteOrder(@PathVariable int id) {
        orderService.deleteOrder(id);
        return "Order deleted";
    }
}