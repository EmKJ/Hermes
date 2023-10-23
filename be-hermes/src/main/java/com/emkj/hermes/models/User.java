package com.emkj.hermes.models;

import java.util.Objects;

import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;

@Entity
public class User {

    @Id
    @GeneratedValue
    private int id;

    @NotBlank(message="must not be blank")
    private String username;

    @Transient
    @NotBlank (message="must not be blank")
    private String loginPass;
    
    private String pwHash;
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private User () {}

    // public User (String username, String password) {
    //     this.username = username;
    //     this.pwHash = encoder.encode(password);
    // }
    

    public String getUsername(){
        return username;
    }

    public User(@NotBlank String username, String loginPass, @NotBlank String pwHash) {
        this.username = username;
        this.loginPass = loginPass;
        this.pwHash = pwHash;
    }

    public int getId() {
        return id;
    }
    
    public String getLoginPass() {
        return loginPass;
    }

    public boolean isMatchingPassword(String password){
        return encoder.matches(password, pwHash);
    }

    public String getPwHash() {
        return pwHash;
    }
    
}
