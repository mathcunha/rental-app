package com.rental.api.security.service;

import com.rental.api.security.domain.User;
import com.rental.api.security.repository.RoleRepository;
import com.rental.api.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired
    UserRepository repository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    RoleRepository roleRepository;

    @PreAuthorize("hasRole('ROLE_ADMIN') || (#id == authentication.principal.id)")
    public void delete(Long id){
        repository.deleteById(id);
    }

    /*@PreAuthorize("hasRole('ROLE_ADMIN')")
    Optional<User> findByEmail(String email);
*/

    @PreAuthorize("#user.id == null || #user.id == authentication.principal.id || hasRole('ROLE_ADMIN')")
    public User save(User user){
        if(user.getPassword() != null) {
            if (user.getPassword().strip() == ""){
                user.setPassword(null);
            }else {
                user.setPassword(encoder.encode(user.getPassword()));
            }
        }

        return repository.save(user);
    }

    @PreAuthorize("#id == authentication.principal.id || hasRole('ROLE_ADMIN')")
    public User findById(Long id){
        return repository.findById(id).get();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Page<User> filter(String email, String name, Pageable pageable){
        return repository.findByEmailIgnoreCaseStartingWithAndNameIgnoreCaseStartingWith(email, name, pageable);
    }
}
