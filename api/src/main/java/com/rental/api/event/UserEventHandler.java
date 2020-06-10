package com.rental.api.event;

import com.rental.api.security.repository.RoleRepository;
import com.rental.api.security.domain.Role;
import com.rental.api.security.domain.RoleName;
import com.rental.api.security.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Optional;

@RepositoryEventHandler
@Component
public class UserEventHandler {
    @Autowired
    PasswordEncoder encoder;

    @Autowired
    RoleRepository roleRepository;

    @HandleBeforeSave
    public void handleBeforeSave(User user) {
        if(user.getPassword() != null) {
            if (user.getPassword().strip() == ""){
                user.setPassword(null);
            }else {
                user.setPassword(encoder.encode(user.getPassword()));
            }
        }
    }

    @HandleBeforeCreate
    public void handleUserCreate(User user) {
        Role role = new Role(RoleName.ROLE_CLIENT);
        Optional<Role> opRole = roleRepository.findByName(RoleName.ROLE_CLIENT);
        if (opRole.isPresent()){
            role = opRole.get();
        }else{
            role = roleRepository.save(role);
        }

        user.setRoles(new HashSet<>());
        user.getRoles().add(role);
        if(user.getPassword() != null) {
            if (user.getPassword().strip() == ""){
                user.setPassword(null);
            }else {
                user.setPassword(encoder.encode(user.getPassword()));
            }
        }

        if(user.getName() != null) {
            user.setName(user.getName().strip());
        }

        if(user.getUsername() != null) {
            user.setUsername(user.getUsername().strip());
        }
    }
}
