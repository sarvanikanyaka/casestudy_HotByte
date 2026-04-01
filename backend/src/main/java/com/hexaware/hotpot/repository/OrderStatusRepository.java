package com.hexaware.hotpot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hexaware.hotpot.entity.OrderStatus;

public interface OrderStatusRepository extends JpaRepository<OrderStatus, Integer> {

    OrderStatus findByStatusName(String statusName);
}