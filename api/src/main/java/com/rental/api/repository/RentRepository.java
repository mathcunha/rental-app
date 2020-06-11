package com.rental.api.repository;

import com.rental.api.domain.Rent;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(exported = true)
@CrossOrigin
public interface RentRepository extends Repository<Rent, Long> {
    @PreAuthorize("#rent.id == null && #rent.user.id == authentication.principal.id")
    Rent save(Rent rent);
}
