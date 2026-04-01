package com.hexaware.hotpot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.hotpot.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

}