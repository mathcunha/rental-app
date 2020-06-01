package com.rental.api.security.repository;

import com.rental.api.security.domain.Role;
import com.rental.api.security.domain.RoleName;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface RoleRepository extends CrudRepository<Role, Long> {
    Optional<Role> findByName(RoleName role);
}
