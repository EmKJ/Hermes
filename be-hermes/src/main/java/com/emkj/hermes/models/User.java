package com.emkj.hermes.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue
    private int id;
    private String username;
    private String password;
    private String pwHash;

    public User () {}

    public User (String username, String password) {
        this.username = username;
        // this.pwHash = encoder.encode(password);
        this.password = password;
    }
    
    public int getId() { return id; }
    public String getUsername(){ return username; }
    public String getPassword(){ return password; }
    public String getPwHash() { return pwHash; } 
    
}
