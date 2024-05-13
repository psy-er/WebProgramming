package com.example.demo.service;

import com.example.demo.Repository.UserRepository;
import com.example.demo.model.UserEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserEntity create(final UserEntity userEntity){
        if(userEntity == null || userEntity.getUsername() == null){
            throw new RuntimeException("Invalid arguments");
        }

        final String username = userEntity.getUsername();

        if(userRepository.existsByUsername(username)){
            log.warn("Username already exists {}", username);
            throw new RuntimeException("Username already exists");
        }
        return userRepository.save(userEntity);
    }

    /*
    public UserEntity getByCredential(final String username, final String password){
        return userRepository.findByUsernameAndPassword(username, password);
    }
    */


    // 패스워드를 string으로 선언하면 안좋다 -> 암호화 시켜야 한다
    public UserEntity getByCredential(final String username, final String password, final PasswordEncoder encoder){

        final UserEntity originalUser = userRepository.findByUsername(username);
        // matches 메서드로 같은지 확인
        if(originalUser != null && encoder.matches(password, originalUser.getPassword())){
            return originalUser;
        }
        return null;
    }

}
