package com.hexaware.hotpot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hexaware.hotpot.entity.Order;
import com.hexaware.hotpot.repository.OrderRepository;
import com.hexaware.hotpot.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderRepository orderRepository;
   
    @PostMapping("/place")
    public Order placeOrder(@RequestBody Order order) {
        return orderService.placeOrder(order);
    }

    @PutMapping("/update")
    public Order updateOrder(@RequestBody Order order) {
        return orderService.updateOrder(order);
    }

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Integer id) {
        return orderService.getOrderById(id);
    }
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Integer id) {
        orderService.deleteOrder(id);
        return "Order deleted";
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
    @PutMapping("/status/{id}")
    public Order updateStatus(@PathVariable Integer id, @RequestParam String status) {
        Order order = orderRepository.findById(id).orElse(null);
        order.setOrderStatus(status);
        return orderRepository.save(order);
    }
    
    @PostMapping("/{userId}")
    public Order placeOrder(@PathVariable Integer userId){
        return orderService.placeOrder(userId);
    }
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Integer userId) {
        return orderService.getOrdersByUser(userId);
    }
}