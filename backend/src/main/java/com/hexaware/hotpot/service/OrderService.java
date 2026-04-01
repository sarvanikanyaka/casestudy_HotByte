package com.hexaware.hotpot.service;

import java.util.List;
import com.hexaware.hotpot.entity.Order;

public interface OrderService {

    Order placeOrder(Order order);

    Order getOrderById(Integer orderId);

    List<Order> getOrdersByUser(Integer userId);

    List<Order> getAllOrders();

    Order updateOrderStatus(Integer orderId, String status);

	Order updateOrder(Order order);

	Order placeOrder(Integer userId);
	void deleteOrder(Integer id);
	
}