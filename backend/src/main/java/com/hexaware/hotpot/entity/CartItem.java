package com.hexaware.hotpot.entity;

import jakarta.persistence.*;
import lombok.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "cart_items")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartItemId;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonIgnore
    private Cart cart;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "menu_id")
    private Menu menu;
    private Integer quantity;

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getQuantity() {
        return quantity;
    }
	public Integer getCartItemId() {
		return cartItemId ;
	}
	
	public Cart getCart() {
	    return cart;
	}

	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}

	public void setCartItemId(Integer cartItemId) {
		this.cartItemId = cartItemId;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public User getUser() {
		// TODO Auto-generated method stub
		return null;
	}


}