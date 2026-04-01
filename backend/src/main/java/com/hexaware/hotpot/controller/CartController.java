package com.hexaware.hotpot.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hexaware.hotpot.entity.Cart;
import com.hexaware.hotpot.entity.CartItem;
import com.hexaware.hotpot.service.CartService;
import com.hexaware.hotpot.repository.*;
@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @PostMapping("/add/{userId}")
    public Cart addToCart(@PathVariable Integer userId,
                         @RequestParam(name="menuId") Integer menuId,
                         @RequestParam(name="qty") Integer qty) {

        System.out.println("UserId: " + userId);
        System.out.println("MenuId: " + menuId);
        System.out.println("Qty: " + qty);

        return cartService.addToCart(userId, menuId, qty);
    }

  
    @GetMapping("/user/{userId}")
    public List<CartItem> getCartByUser(@PathVariable Integer userId) {

        Cart cart = cartRepository.findByUser_UserId(userId);

        if (cart == null) return new ArrayList<>();
            return cartItemRepository.findByCart_CartId(cart.getCartId()); 
        
        }
    
    @PutMapping("/update")
    public CartItem updateCartItem(@RequestParam Integer cartItemId,
                                  @RequestParam int quantity) {
        return cartService.updateCartItem(cartItemId, quantity);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Cart> removeCartItem(@PathVariable Integer id) {
        cartService.removeCartItem(id);
        Cart updatedCart = cartService.getAuthenticatedUserCart(); 
        return ResponseEntity.ok(updatedCart); 
    }

 
    @DeleteMapping("/clear/{userId}")
    public void clearCart(@PathVariable Integer userId) {

        	System.out.println("CLEAR CART CALLED for user: " + userId);

            cartService.clearCart(userId);
        }
    }