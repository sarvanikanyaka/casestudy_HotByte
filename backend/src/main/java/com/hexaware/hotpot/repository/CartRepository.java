package com.hexaware.hotpot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.hotpot.entity.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

	Cart findByUser_UserId(Integer userId);
    
	

}