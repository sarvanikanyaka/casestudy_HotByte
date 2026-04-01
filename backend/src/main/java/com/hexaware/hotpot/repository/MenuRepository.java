package com.hexaware.hotpot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.hotpot.entity.Menu;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Integer> {

}