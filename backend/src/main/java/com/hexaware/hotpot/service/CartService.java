package com.hexaware.hotpot.service;

import java.util.List;

import com.hexaware.hotpot.entity.Cart;
import com.hexaware.hotpot.entity.CartItem;

public interface CartService {

    CartItem updateCartItem(Integer cartItemId, int quantity);

    void removeCartItem(Integer cartItemId);

    List<CartItem> getCartItems(Integer cartId);

    void clearCart(Integer userId);

	Cart addToCart(Integer userId, Integer menuId, Integer qty);

	Cart getAuthenticatedUserCart();
	
}