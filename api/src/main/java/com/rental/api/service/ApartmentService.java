package com.rental.api.service;

import com.rental.api.domain.Apartment;
import com.rental.api.repository.ApartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class ApartmentService {
    @Autowired
    ApartmentRepository repository;

    @PreAuthorize("hasRole('ROLE_REALTOR') || hasRole('ROLE_ADMIN')")
    @PostAuthorize("hasRole('ROLE_ADMIN') || (returnObject.user != null && returnObject.user.id == authentication.principal.id)")
    public Apartment findById(Long id){
        return repository.findById(id).get();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') || ('publicApartment'.equals(#projection) && true == #available) || (hasRole('ROLE_REALTOR') && #userId == authentication.principal.id)")
    public Page<Apartment> filter(String name, Float aptSize, Float price, Integer room, Long userId, Boolean available, String projection, Pageable pageable){
        return repository.filter(name, aptSize, price, room, userId, available, pageable);
    }

    @PreAuthorize("'publicApartment'.equals(#projection)")
    public Apartment findToRent(Long id, String projection){
        return repository.findToRent(id, projection);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') || (hasRole('ROLE_REALTOR') && @apartmentService.findById(#id).user.id == authentication.principal.id)")
    public void delete(Long id){
        Apartment apt = new Apartment();
        apt.setId(id);
        repository.delete(apt);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') || (hasRole('ROLE_REALTOR') && #apt.user != null && #apt.user.id == authentication.principal.id && (#apt.id == null || @apartmentService.findById(#apt.id).user.id == authentication.principal.id))")
    public Apartment save(Apartment apt){
        return repository.save(apt);
    }
}
