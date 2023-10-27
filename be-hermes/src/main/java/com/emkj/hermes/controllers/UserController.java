package com.emkj.hermes.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.emkj.hermes.models.User;
import com.emkj.hermes.models.data.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    UserRepository userRepository;

    ResponseEntity<Map<String, String>> response;
    Map<String,String> responseBody = new HashMap<>();

    private static final String userSessionKey = "user";

    //Example
    @GetMapping("/hello")
    ResponseEntity<String> hello() {
    return new ResponseEntity<>("Hello World!", HttpStatus.OK);
}
    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<Map<String, String>> processRegistrationForm(@Valid @RequestBody User registrationFormData, HttpServletRequest request){
       
        
        User newUser = new User(registrationFormData.getUsername(), registrationFormData.getPwHash());
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);
        
            responseBody.put("message","Successfully added new user"+ newUser);
            response = ResponseEntity
                            .status(HttpStatus.CREATED)
                            .body(responseBody);
        
        return response;
   };
   
   @PostMapping ("/login") 
   @ResponseBody
   public ResponseEntity<Map<String, String>> processLoginForm( @Valid @RequestBody User loginFormData, HttpServletRequest request)  {
        try {
            User theUser = userRepository.findByUsername(loginFormData.getUsername());
            if (theUser == null){
                responseBody.put("message", "Invalid user name");
                response = ResponseEntity
                            .status(HttpStatus.NOT_FOUND)
                            .body(responseBody);
                return response;
            }
        
            String pwHash = theUser.getPwHash();
            String loginPass = loginFormData.getPwHash();
            if (!loginPass.equalsIgnoreCase(pwHash)) {
                responseBody.put("message", "Invalid password");
                response = ResponseEntity
                            .status(HttpStatus.UNAUTHORIZED)
                            .body(responseBody);
                return response;
                } 
            //  if (!theUser.isMatchingPassword(loginFormData.getLoginPass())) {
            //     responseBody.put("message", "Invalid password");
            //     response = ResponseEntity
            //                 .status(HttpStatus.UNAUTHORIZED)
            //                 .body(responseBody);
            //     return response;
            //     } 
                
            setUserInSession(request.getSession(), theUser);
            // return response entity http ok and logged in token JWT?
                responseBody.put("message", "Successful login");
                response = ResponseEntity
                            .status(HttpStatus.CREATED)
                            .body(responseBody);
            return response;
        } catch (Exception e) {
            responseBody.put("message", "An error occurred: "+e.getLocalizedMessage());
            response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(responseBody);
            return response;
        }                 
   }

    public User getUserFromSession (HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);
        if(userId == null){
            return null;
        }
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) {
            return null;
        }
        return user.get();
    }
    
    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }
}
