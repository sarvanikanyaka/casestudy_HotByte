package com.hexaware.hotpot.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hexaware.hotpot.entity.Cart;
import com.hexaware.hotpot.entity.CartItem;
import com.hexaware.hotpot.entity.Menu;
import com.hexaware.hotpot.repository.CartItemRepository;
import com.hexaware.hotpot.repository.CartRepository;
import com.hexaware.hotpot.repository.MenuRepository;
import com.hexaware.hotpot.repository.UserRepository;
import com.hexaware.hotpot.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public CartItem updateCartItem(Integer cartItemId, int quantity) {
        CartItem item = cartItemRepository.findById(cartItemId).orElse(null);
        if (item != null) {
            item.setQuantity(quantity);
            return cartItemRepository.save(item);
        }
        return null;
    }

    @Override
    @Transactional
    public void removeCartItem(Integer id) {
        cartItemRepository.deleteById(id);
    }

    @Override
    public List<CartItem> getCartItems(Integer cartId) {
        return cartItemRepository.findByCart_CartId(cartId);
    }

    @Override
    @Transactional
    public void clearCart(Integer userId) {

        Cart cart = cartRepository.findByUser_UserId(userId);

        if (cart != null) {
         List<CartItem> items =   cartItemRepository.findByCart_CartId(cart.getCartId());
           cartItemRepository.deleteAll(items);
        }
    }
  
    @Override
    @Transactional
    public Cart addToCart(Integer userId, Integer menuId, Integer qty) {

        Cart cart = cartRepository.findByUser_UserId(userId);

        if (cart == null) {
            cart = new Cart();
            cart.setUser(userRepository.findById(userId).orElse(null));
            cart = cartRepository.save(cart);
        }

        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new RuntimeException("Menu not found"));

        CartItem item = new CartItem();
        item.setCart(cart);
        item.setMenu(menu);
        item.setQuantity(qty);

        cartItemRepository.save(item); 

        return cart;
    }

	@Override
	public Cart getAuthenticatedUserCart() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			String email = authentication.getName();
			User user = userRepository.findByEmail(email);
			if (user != null) {
				return cartRepository.findByUser_UserId(user.getUserId());
			}
		}
		return null;
	}

}