package com.hexaware.hotpot.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleId;

    @Column(name = "role_name", unique = true, nullable = false)
    private String roleName;

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
		
	}

}