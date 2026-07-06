package com.hexaware.hotpot.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

@Entity
@Table(name = "restaurants")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer restaurantId;

    @Column(nullable = false, length = 150)
    private String name;

    private String location;

    @Column(name = "contact_number")
    private String contactNumber;

    private String email;

    private String password;

    @Column(name = "cuisine_type")
    private String cuisineType;

    @Column(name = "image_url")
    private String imageUrl;

    private Double rating;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

	public Object getEmail() {
		return null;
	}

	public Object getPassword() {
		return null;
	}
	public Integer getRestaurantId() {
	    return restaurantId;
	}
	
	public String getName() {
	    return name;
	}

	public void setName(String name) {
	    this.name = name;
	}

}