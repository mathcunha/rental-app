package com.rental.api.repository;

import com.rental.api.domain.Apartment;
import com.rental.api.domain.AptStats;
import com.rental.api.domain.PublicApartment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ApartmentRepository extends CrudRepository<Apartment, Long> {
    @Query(
            value = "select a.publicInfo from Apartment a where (CAST(:name AS string) is null or upper(a.publicInfo.name) LIKE CONCAT('%',upper(CAST(:name AS string)),'%')) and (:available is null or a.available = :available) and (:aptSize is null or a.publicInfo.aptSize >= :aptSize) and (:price is null or a.publicInfo.price >= :price) and (:room is null or a.publicInfo.room >= :room) and (:userId is null or a.user.id = :userId)"
            ,countQuery = "select COUNT(a) from Apartment a where (CAST(:name AS string) is null or upper(a.publicInfo.name) LIKE CONCAT('%',upper(CAST(:name AS string)),'%')) and (:available is null or a.available = :available) and (:aptSize is null or a.publicInfo.aptSize >= :aptSize) and (:price is null or a.publicInfo.price >= :price) and (:room is null or a.publicInfo.room >= :room) and (:userId is null or a.user.id = :userId)"
    )
    Page<PublicApartment> filter(String name, Float aptSize, Float price, Integer room, Long userId, Boolean available, Pageable pageable);

    @Query("select new com.rental.api.domain.AptStats(min(a.publicInfo.aptSize), min(a.publicInfo.price), min(a.publicInfo.room), max(a.publicInfo.aptSize), max(a.publicInfo.price), max(a.publicInfo.room)) from Apartment a where a.available = true")
    public AptStats findAptFilterRange();

    @Query("select a.publicInfo from Apartment a where a.id = :id and a.available = true")
    Optional<PublicApartment> findToRent(Long id);
}
