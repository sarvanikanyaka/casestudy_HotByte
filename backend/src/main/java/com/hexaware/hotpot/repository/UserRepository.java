package com.hexaware.hotpot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hexaware.hotpot.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	   User findByEmail(String email);
}

