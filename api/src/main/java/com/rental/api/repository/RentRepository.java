package com.rental.api.repository;

import com.rental.api.domain.Rent;
import org.springframework.data.repository.Repository;

public interface RentRepository extends Repository<Rent, Long> {
    Rent save(Rent rent);
}
