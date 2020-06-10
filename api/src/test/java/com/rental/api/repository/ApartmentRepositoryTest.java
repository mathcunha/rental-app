package com.rental.api.repository;

import com.intuit.karate.junit5.Karate;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.DEFINED_PORT)
class ApartmentRepositoryTest {
    @Karate.Test
    Karate testAdmin() {
        return Karate.run("apartment/admin").relativeTo(getClass());
    }

    @Karate.Test
    Karate testPublicAccess() {
        return Karate.run("apartment/public").relativeTo(getClass());
    }

    @Karate.Test
    Karate testCreateAccess() {
        return Karate.run("apartment/create").relativeTo(getClass());
    }

    @Karate.Test
    Karate testUpdateAccess() {
        return Karate.run("apartment/update").relativeTo(getClass());
    }
}