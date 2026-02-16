package com.example.globalipplatform.project.config;

import com.example.globalipplatform.project.DTO.Role;
import com.example.globalipplatform.project.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserPrincipal implements UserDetails {

    private final String email;
    private final Role role;

    public UserPrincipal(User user) {
        this.email = user.getEmail();
        this.role = user.getRole();
    }



    public UserPrincipal(String email, Role role) {
        this.email = email;
        this.role = role;
    }

    //it is for the roles extraction
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(
                new SimpleGrantedAuthority("ROLE_" + role.name())
        );
    }


    @Override
    public String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}
