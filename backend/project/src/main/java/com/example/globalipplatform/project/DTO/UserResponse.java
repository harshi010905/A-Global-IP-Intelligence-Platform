package com.example.globalipplatform.project.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserResponse {

    private Long id;
    private String username;
    private String email;

    public UserResponse(Long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    @Override
    public String toString() {
        return "UserResponse{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

}
