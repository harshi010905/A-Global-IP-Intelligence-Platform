package com.example.globalipplatform.project.config;

import com.example.globalipplatform.project.DTO.Role;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    private final JWTService jwtService;
    private final MyUserDetailsService userDetailsService;

    public JwtFilter(JWTService jwtService, MyUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain chain)
            throws ServletException, IOException {


        // In JwtFilter.java, add this at the beginning of doFilterInternal
String requestPath = request.getServletPath();
if (requestPath.startsWith("/uploads/") || requestPath.startsWith("/api/files/")) {
    // For file access, check if token is in URL
    String token = request.getParameter("token");
    if (token != null && !token.isEmpty()) {
        // Process token from URL parameter
        try {
            String email = jwtService.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            if (jwtService.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (Exception e) {
            logger.error("Error validating token from URL: {}", e.getMessage());
        }
    }
}


        if (request.getServletPath().contains("/api/auth/")) {
            chain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        String email = null;

        try {
            email = jwtService.extractUsername(token);
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token expired");
            return;
        } catch (MalformedJwtException | SignatureException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid token");
            return;
        } catch (Exception e) {
            logger.error("Error processing JWT token: {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Authentication failed");
            return;
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                
                if (jwtService.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.debug("Authenticated user: {} with role: {}", email, userDetails.getAuthorities());
                }
            } catch (UsernameNotFoundException ex) {
                try {
                    String role = jwtService.extractRole(token);
                    UserPrincipal userPrincipal = new UserPrincipal(email, Role.valueOf(role));
                    
                    if (jwtService.validateToken(token, userPrincipal)) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userPrincipal,
                                null,
                                userPrincipal.getAuthorities()
                        );
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                        logger.debug("Authenticated OAuth2 user: {} with role: {}", email, role);
                    }
                } catch (Exception e) {
                    logger.error("Failed to authenticate OAuth2 user: {}", e.getMessage());
                }
            }
        }
        
        chain.doFilter(request, response);
    }
}