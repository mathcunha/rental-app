package com.rental.api.repository;

import com.rental.api.domain.Apartment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(exported = true)
@CrossOrigin
public interface ApartmentRepository extends Repository<Apartment, Long> {

    @PreAuthorize("hasRole('ROLE_ADMIN') || (hasRole('ROLE_REALTOR') && #apt.user.id == authentication.principal.id)")
    Apartment save(Apartment apt);

    @PreAuthorize("hasRole('ROLE_REALTOR') || hasRole('ROLE_ADMIN')")
    @PostAuthorize("returnObject.user.id == authentication.principal.id || hasRole('ROLE_ADMIN')")
    @Query("select a from Apartment a where a.id = ?1")
    Apartment findById(Long id);

    @PreAuthorize("hasRole('ROLE_ADMIN') || (hasRole('ROLE_REALTOR') && @apartmentRepository.findById(#apt.id).user.id == authentication.principal.id)")
    void delete(Apartment apt);

    @PreAuthorize("hasRole('ROLE_ADMIN') || ('publicApartment'.equals(#projection) && true == #available) || (hasRole('ROLE_REALTOR') && #userId == authentication.principal.id)")
    @RestResource(exported = true, path = "filter", rel = "filter")
    @Query(
            value = "select a from Apartment a inner join fetch a.user u where (:projection is null or :projection = :projection) and (:available is null or a.available = :available) and (:aptSize is null or a.aptSize >= :aptSize) and (:price is null or a.price >= :price) and (:room is null or a.room >= :room) and (:userId is null or a.user.id = :userId)"
            ,countQuery = "select COUNT(a) from Apartment a inner join a.user where (:available is null or a.available = :available) and (:aptSize is null or a.aptSize >= :aptSize) and (:price is null or a.price >= :price) and (:room is null or a.room >= :room) and (:userId is null or a.user.id = :userId)"
    )
    Page<Apartment> filter(Float aptSize, Float price, Integer room, Long userId, Boolean available, String projection, Pageable pageable);

}
