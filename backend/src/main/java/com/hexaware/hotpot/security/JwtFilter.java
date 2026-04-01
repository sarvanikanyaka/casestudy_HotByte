package com.hexaware.hotpot.security;

import com.hexaware.hotpot.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        if (path.startsWith("/api/auth") || path.startsWith("/api/users")) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");

        System.out.println("PATH: " + path);
        System.out.println("HEADER: " + header);

        if (header != null && header.startsWith("Bearer ")) {

            String token = header.substring(7);

            try {
                String username = jwtUtil.extractUsername(token);
                String role = jwtUtil.extractRole(token);
                System.out.println("ROLE FROM TOKEN: " + role);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                    List<SimpleGrantedAuthority> authorities =
                            List.of(new SimpleGrantedAuthority(role));

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(username, null, authorities);

                    SecurityContextHolder.getContext().setAuthentication(auth);
                }

            } catch (Exception e) {
                System.out.println("Invalid Token - Ignored");
            }
        }

        filterChain.doFilter(request, response);
    }
}