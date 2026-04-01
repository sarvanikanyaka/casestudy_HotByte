package com.hexaware.hotpot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.hexaware.hotpot.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

    List<CartItem> findByCart_CartId(Integer cartId);

    CartItem findByCart_CartIdAndMenu_MenuId(Integer cartId, Integer menuId);
}