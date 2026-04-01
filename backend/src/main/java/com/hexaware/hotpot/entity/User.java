package com.hexaware.hotpot.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
@Entity
@Table(name = "users")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private String name;

    private String gender;

    @Column(unique = true)
    private String email;
    private String phone;
    private String password;
    private String role;
    
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserRole> userRoles;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserAddress> addresses;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Cart> carts;
    
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

	public void setEmail(String email) {
		this.email = email;
	}
	
	public Integer getUserId() {
	    return userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public String getRole() {
	    return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}