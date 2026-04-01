package com.hexaware.hotpot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hexaware.hotpot.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
	@Query("SELECT o FROM Order o LEFT JOIN FETCH o.orderItems WHERE o.user.userId = :userId")
	List<Order> findByUserIdWithItems(@Param("userId") Integer userId);
}