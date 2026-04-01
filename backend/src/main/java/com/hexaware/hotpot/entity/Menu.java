package com.hexaware.hotpot.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "menu")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer menuId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = "discount_price")
    private BigDecimal discountPrice;

    @Column(name = "availability_time")
    private String availabilityTime;

    @Column(name = "is_veg")
    private Boolean isVeg;

    @Column(name = "taste_info")
    private String tasteInfo;

    private Integer calories;

    private BigDecimal fats;

    private BigDecimal proteins;

    private BigDecimal carbohydrates;

    @Column(name = "cooking_time")
    private Integer cookingTime;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "is_available")
    private Boolean isAvailable;

	public Restaurant getRestaurant() {
	    return restaurant;
	}

	public void setItemName(String itemName) {
	    this.itemName = itemName;
	}

	public String getItemName() {
	    return itemName;
	}
	public BigDecimal getPrice() {
	    return price;
	}

	public void setPrice(BigDecimal price) {
	    this.price = price;
	}

	public Integer getCalories() {
		return calories;
	}

	public void setCalories(Integer calories) {
		this.calories = calories;
	}

	public BigDecimal getFats() {
		return fats;
	}

	public void setFats(BigDecimal fats) {
		this.fats = fats;
	}

	public BigDecimal getCarbohydrates() {
		return carbohydrates;
	}

	public void setCarbohydrates(BigDecimal carbohydrates) {
		this.carbohydrates = carbohydrates;
	}

	public BigDecimal getProteins() {
		return proteins;
	}

	public void setProteins(BigDecimal proteins) {
		this.proteins = proteins;
	}

	public Integer getMenuId() {
		return menuId;
	}

	public BigDecimal getItemPrice() {
		// TODO Auto-generated method stub
		return null;
	}

}