package com.rental.api.repository;

import com.rental.api.domain.Rent;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(exported = true)
@CrossOrigin
public interface RentRepository extends Repository<Rent, Long> {
    Rent save(Rent rent);
}
