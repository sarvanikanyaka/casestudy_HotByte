package com.hexaware.hotpot.service;
import com.hexaware.hotpot.repository.UserRepository;
import java.math.BigDecimal;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.hotpot.entity.Order;
import com.hexaware.hotpot.entity.OrderItem;
import com.hexaware.hotpot.repository.OrderRepository;
import com.hexaware.hotpot.repository.CartRepository;
import com.hexaware.hotpot.entity.Cart;
import com.hexaware.hotpot.entity.CartItem;
import com.hexaware.hotpot.repository.*;
import com.hexaware.hotpot.entity.OrderStatus;
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private OrderStatusRepository orderStatusRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Override
    public Order placeOrder(Order order) {

        Integer userId = order.getUser() != null 
                ? order.getUser().getUserId() 
                : null;

        if(userId == null){
            throw new RuntimeException("UserId is required");
        }

        order.setUser(userRepository.findById(userId).orElse(null));

        return orderRepository.save(order);
    }

    @Override
    public Order getOrderById(Integer orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    @Override
    public List<Order> getOrdersByUser(Integer userId) {
    	return orderRepository.findByUserIdWithItems(userId);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order updateOrderStatus(Integer orderId, String status) {

        Order order = orderRepository.findById(orderId).orElse(null);

        if(order == null) {
            throw new RuntimeException("Order not found");
        }

        OrderStatus orderStatus = orderStatusRepository.findByStatusName(status);

        if(orderStatus == null) {
            orderStatus = new OrderStatus();
            orderStatus.setStatusName(status);
            orderStatus = orderStatusRepository.save(orderStatus);
        }

        order.setStatus(orderStatus);

        return orderRepository.save(order);
    }

    @Override
    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Transactional
    public Order placeOrder(Integer userId) {

        Cart cart = cartRepository.findByUser_UserId(userId);

        if (cart == null || cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(cart.getUser());
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus("PENDING");

      
        BigDecimal total = BigDecimal.ZERO;

        List<OrderItem> items = new ArrayList<>();

        for (CartItem cartItem : cart.getCartItems()) {

            BigDecimal price = cartItem.getMenu().getPrice();
            BigDecimal quantity = BigDecimal.valueOf(cartItem.getQuantity());

            total = total.add(price.multiply(quantity));

            OrderItem oi = new OrderItem();
            oi.setOrder(order); 
            oi.setMenu(cartItem.getMenu());
            oi.setQuantity(cartItem.getQuantity());

            items.add(oi);
        }

        order.setTotalAmount(total);

        order.setOrderItems(items);

        Order savedOrder = orderRepository.save(order);

   
        cartItemRepository.deleteAll(cart.getCartItems());

        return savedOrder;
    }
    @Override
    public void deleteOrder(Integer id) {
        orderRepository.deleteById(id);
    }
}