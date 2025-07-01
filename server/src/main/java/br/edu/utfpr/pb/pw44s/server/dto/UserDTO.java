package br.edu.utfpr.pb.pw44s.server.dto;

import br.edu.utfpr.pb.pw44s.server.model.User;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UserDTO {

    private Long id;

    @NotNull
    @Size(min = 4, max = 50)
    private String username;

    @NotNull
    @Size(min = 4, max = 50)
    private String displayName;

    @NotNull
    @Size(min = 6)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
    private String password;


    public UserDTO() {
    }


    public UserDTO(User user) {
        this.id = user.getId();
        this.displayName = user.getDisplayName();
        this.username = user.getUsername();
        this.password = user.getPassword();
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Método para converter UserDTO em User
    public User getUser() {
        User user = new User();
        user.setId(this.id);
        user.setDisplayName(this.displayName);
        user.setUsername(this.username);
        user.setPassword(this.password);
        return user;
    }
}
