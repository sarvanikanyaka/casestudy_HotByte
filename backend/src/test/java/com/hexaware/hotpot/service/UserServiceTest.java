package com.hexaware.hotpot.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.hexaware.hotpot.entity.User;

public class UserServiceTest {

    @Test
    public void testUserObjectCreation() {

        User user = new User();
        user.setName("Sarvani");
        user.setEmail("sarvani@gmail.com");

        assertEquals("Sarvani", user.getName());
    }

}