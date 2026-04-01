package com.hexaware.hotpot.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "order_status")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class OrderStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer statusId;

    @Column(name = "status_name", unique = true, nullable = false)
    private String statusName;
    
  
    @OneToMany(mappedBy = "status")
    @JsonIgnore
    private List<Order> orders;

	public static OrderStatus valueof(String status) {
		// TODO Auto-generated method stub
		return null;
	}

	public String getStatusName() {
		return statusName;
	}

}