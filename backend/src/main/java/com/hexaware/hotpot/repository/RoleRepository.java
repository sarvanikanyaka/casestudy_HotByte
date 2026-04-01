package com.hexaware.hotpot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.hotpot.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findByRoleName(String roleName);

}