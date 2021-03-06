package com.rental.api.service;

import com.rental.api.domain.Apartment;
import com.rental.api.domain.AptStats;
import com.rental.api.domain.PublicApartment;
import com.rental.api.repository.ApartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ApartmentService {
    @Autowired
    ApartmentRepository repository;

    @PreAuthorize("hasRole('ROLE_REALTOR') || hasRole('ROLE_ADMIN')")
    @PostAuthorize("hasRole('ROLE_ADMIN') || (returnObject.orElse(null)?.user.id == authentication.principal.id)")
    public Optional<Apartment> findById(Long id){
        return repository.findById(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') || ('publicApartment'.equals(#projection) && true == #available) || (hasRole('ROLE_REALTOR') && #userId == authentication.principal.id)")
    public Page<PublicApartment> filter(String name, Float aptSize, Float price, Integer room, Long userId, Boolean available, String projection, Pageable pageable){
        return repository.filter(name, aptSize, price, room, userId, available, pageable);
    }

    public AptStats getStats(){
        return repository.findAptFilterRange();
    }

    public Optional<PublicApartment> findToRent(Long id){
        return repository.findToRent(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') || (hasRole('ROLE_REALTOR') && @apartmentService.findById(#id).get().user.id == authentication.principal.id)")
    public Boolean delete(Long id){
        if(repository.existsById(id)){
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') || ( hasRole('ROLE_REALTOR') && ((#apt.id == null && #apt.user.id == authentication.principal.id) || (#apt.id != null && @apartmentService.findById(#apt.id).get().user.id == authentication.principal.id))) ")
    public Apartment save(Apartment apt){
        return repository.save(apt);
    }
}
