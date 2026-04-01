package com.hexaware.hotpot.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.hexaware.hotpot.entity.Payment;

public class PaymentServiceTest {

    @Test
    public void testPaymentMethod() {

        Payment payment = new Payment();
        payment.setPaymentMethod("UPI");

        assertEquals("UPI", payment.getPaymentMethod());
    }

}