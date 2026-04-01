package com.hexaware.hotpot.service;

import java.util.List;
import com.hexaware.hotpot.entity.Payment;

public interface PaymentService {

    Payment processPayment(Payment payment);

    Payment getPaymentById(Integer paymentId);

    List<Payment> getAllPayments();

	Payment makePayment(Payment payment);
}