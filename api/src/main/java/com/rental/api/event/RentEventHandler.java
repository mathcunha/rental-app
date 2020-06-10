package com.rental.api.event;

import com.rental.api.domain.Apartment;
import com.rental.api.domain.Rent;
import com.rental.api.repository.ApartmentRepository;
import com.rental.api.security.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@RepositoryEventHandler
@Component
public class RentEventHandler {
    @PersistenceContext
    private EntityManager em;

    @HandleBeforeCreate
    public void handleBeforeSave(Rent rent) {
        Apartment apt = em.find(Apartment.class, rent.getApartment().getApartmentId());
        if(!rent.getApartment().getPrice().equals(apt.getPrice())){
            rent.getApartment().setPrice(null);
        }
        rent.getApartment().setName(apt.getName());
    }
}
