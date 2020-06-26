package com.rental.api.service;

import com.rental.api.domain.PublicApartment;
import com.rental.api.domain.Rent;
import com.rental.api.repository.RentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class RentService {
    @Autowired
    RentRepository repository;

    @Autowired
    ApartmentService aptService;

    //https://stackoverflow.com/questions/1972933/cross-field-validation-with-hibernate-validator-jsr-303
    @PreAuthorize("#rent.id == null && #rent.user.id == authentication.principal.id")
    public Rent save(Rent rent){
        PublicApartment apt = aptService.findToRent(rent.getApartment().getApartmentId()).get();
        if(!rent.getApartment().getPrice().equals(apt.getPrice())){
            rent.getApartment().setPrice(null);
        }
        rent.getApartment().setName(apt.getName());

        return repository.save(rent);
    }
}
