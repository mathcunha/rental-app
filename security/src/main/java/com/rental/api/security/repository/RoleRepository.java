package com.rental.api.security.repository;

import com.rental.api.security.domain.Role;
import com.rental.api.security.domain.RoleName;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Optional<Role> findByName(RoleName role);
}
