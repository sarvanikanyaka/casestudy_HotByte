package com.hexaware.hotpot.controller;

import com.hexaware.hotpot.dto.LoginDTO;
import com.hexaware.hotpot.entity.User;
import com.hexaware.hotpot.util.JwtUtil;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.hexaware.hotpot.repository.*;
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginDTO loginDTO) {

        User user = userRepository.findByEmail(loginDTO.getEmail());

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!user.getPassword().equals(loginDTO.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String role = user.getRole();

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());


        Map<String, Object> res = new HashMap<>();
        res.put("token", token);
        res.put("role", role);
        res.put("userId", user.getUserId());

        return res;
    }
}