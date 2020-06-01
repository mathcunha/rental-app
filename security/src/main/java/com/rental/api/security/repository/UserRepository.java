package com.rental.api.security.repository;

import com.rental.api.security.domain.User;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@RepositoryRestResource(exported = true)
@CrossOrigin
public interface UserRepository extends Repository<User, Long> {
    @RestResource(exported = false)
    Optional<User> findByUsername(String username);

    @RestResource(exported = true)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Optional<User> findByEmail(String email);

    @RestResource(exported = true)
    @PreAuthorize("#user.id == null || #user.id == authentication.principal.id || hasRole('ROLE_ADMIN')")
    User save(User user);

    @RestResource(exported = true)
    @PreAuthorize("#id == authentication.principal.id || hasRole('ROLE_ADMIN')")
    Optional<User> findById(Long id);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Iterable<User> findAll();
}
