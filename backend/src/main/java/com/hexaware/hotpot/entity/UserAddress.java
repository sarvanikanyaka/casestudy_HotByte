package com.hexaware.hotpot.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_address")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer addressId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "address_line")
    private String addressLine;

    private String city;

    private String state;

    private String pincode;

}