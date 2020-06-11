package com.rental.api.event;

import com.rental.api.domain.Apartment;
import com.rental.api.domain.Rent;
import com.rental.api.repository.ApartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

@RepositoryEventHandler
@Component
public class RentEventHandler {
    @Autowired
    ApartmentRepository aptRepository;
    //https://stackoverflow.com/questions/1972933/cross-field-validation-with-hibernate-validator-jsr-303

    @HandleBeforeCreate
    public void handleBeforeSave(Rent rent) {
        Apartment apt = aptRepository.findToRent(rent.getApartment().getApartmentId(), "publicApartment");
        if(!rent.getApartment().getPrice().equals(apt.getPrice())){
            rent.getApartment().setPrice(null);
        }
        rent.getApartment().setName(apt.getName());
    }
}
