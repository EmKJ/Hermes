package com.emkj.hermes.models.data;

import org.springframework.data.repository.CrudRepository;

import com.emkj.hermes.models.User;

public interface UserRepository extends CrudRepository< User, Integer> {
    
}
