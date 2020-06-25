package com.rental.api.repository;

import com.rental.api.domain.Apartment;
import com.rental.api.domain.AptStats;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ApartmentRepository extends CrudRepository<Apartment, Long> {
    @Query(
            value = "select a from Apartment a inner join fetch a.user u where (CAST(:name AS string) is null or upper(a.name) LIKE CONCAT('%',upper(CAST(:name AS string)),'%')) and (:available is null or a.available = :available) and (:aptSize is null or a.aptSize >= :aptSize) and (:price is null or a.price >= :price) and (:room is null or a.room >= :room) and (:userId is null or a.user.id = :userId)"
            ,countQuery = "select COUNT(a) from Apartment a inner join a.user where (CAST(:name AS string) is null or upper(a.name) LIKE CONCAT('%',upper(CAST(:name AS string)),'%')) and (:available is null or a.available = :available) and (:aptSize is null or a.aptSize >= :aptSize) and (:price is null or a.price >= :price) and (:room is null or a.room >= :room) and (:userId is null or a.user.id = :userId)"
    )
    Page<Apartment> filter(String name, Float aptSize, Float price, Integer room, Long userId, Boolean available, Pageable pageable);

    @Query("select new com.rental.api.domain.AptStats(min(a.aptSize), min(a.price), min(a.room), max(a.aptSize), max(a.price), max(a.room)) from Apartment a where a.available = true")
    public AptStats findAptFilterRange();

    @Query("select a from Apartment a where a.id = :id and a.available = true and (:projection is null or :projection = :projection)")
    Apartment findToRent(Long id, String projection);
}
