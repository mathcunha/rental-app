package com.rental.api.repository;

import com.intuit.karate.junit5.Karate;

class ApartmentRepositoryTest {
    @Karate.Test
    Karate testAdmin() {
        return Karate.run("apartment/admin").relativeTo(getClass());
    }
}