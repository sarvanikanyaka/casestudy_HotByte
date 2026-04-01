package com.hexaware.hotpot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hexaware.hotpot.entity.Payment;
import com.hexaware.hotpot.service.PaymentService;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

 
    @PostMapping("/pay")
    public Payment makePayment(@RequestBody Payment payment) {
        return paymentService.makePayment(payment);
    }

    @GetMapping("/{id}")
    public Payment getPayment(@PathVariable Integer id) {
        return paymentService.getPaymentById(id);
    }


    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }
}