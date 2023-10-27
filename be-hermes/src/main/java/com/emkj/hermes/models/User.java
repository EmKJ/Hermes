package com.emkj.hermes.models;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue
    private int id;
    private String username;
    private String pwHash;

    public User () {}

    public User (String username, String password) {
        this.username = username;
        // this.pwHash = encoder.encode(password);
        this.pwHash = password;
    }
    
    public int getId() { return id; }
    public String getUsername(){ return username; }
    public String getPwHash() { return pwHash; } 
    
}
