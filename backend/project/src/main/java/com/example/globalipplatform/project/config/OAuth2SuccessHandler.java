package com.example.globalipplatform.project.config;

import com.example.globalipplatform.project.DTO.Role;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTService jwtService;

    public OAuth2SuccessHandler(JWTService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        
        // If email is null for GitHub, try to get it differently
        if (email == null) {
            email = oAuth2User.getAttribute("login") + "@github.oauth";
        }

        UserPrincipal userPrincipal = new UserPrincipal(
                email,
                Role.USER  // Default role for OAuth2 users
        );

        String token = jwtService.generateToken(userPrincipal);

        // Redirect to frontend with token
        String redirectUrl = "http://localhost:3000/oauth2-success?token=" + token;
        
        // You can also return JSON response for API clients
        if (request.getHeader("Accept") != null && request.getHeader("Accept").contains("application/json")) {
            response.setContentType("application/json");
            response.getWriter().write("{\"token\":\"" + token + "\", \"tokenType\":\"Bearer\"}");
        } else {
            response.sendRedirect(redirectUrl);
        }
    }
}