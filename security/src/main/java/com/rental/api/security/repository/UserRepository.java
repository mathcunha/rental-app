package com.rental.api.security.repository;

import com.rental.api.security.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    void delete(User user);

    Optional<User> findByEmail(String email);

    User save(User user);

    Optional<User> findById(Long id);

    Page<User> findByEmailIgnoreCaseStartingWithAndNameIgnoreCaseStartingWith(String email, String name, Pageable pageable);
}
