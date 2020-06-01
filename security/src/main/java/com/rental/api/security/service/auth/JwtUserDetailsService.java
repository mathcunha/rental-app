package com.rental.api.security.service.auth;

import com.rental.api.security.domain.User;
import com.rental.api.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<User> opUser = userRepository.findByUsername(s);
        if (opUser.isPresent()) {
            User user = opUser.get();
            //https://www.javainuse.com/onlineBcrypt
            //https://www.javainuse.com/spring/boot-jwt
            //https://grokonez.com/spring-framework/spring-security/spring-security-jwt-authentication-restapis-springboot-spring-mvc-spring-security-spring-jpa-mysql
            return user;
        } else {
            throw new UsernameNotFoundException("User not found with username: " + s);
        }
    }
}
