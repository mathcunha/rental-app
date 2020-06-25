package com.rental.api.security.repository;

import com.rental.api.security.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Page<User> findByEmailIgnoreCaseStartingWithAndNameIgnoreCaseStartingWith(String email, String name, Pageable pageable);
}
