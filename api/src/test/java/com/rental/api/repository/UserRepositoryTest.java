package com.rental.api.repository;

import com.intuit.karate.junit5.Karate;

public class UserRepositoryTest {
    @Karate.Test
    Karate testLogin() {
        return Karate.run("login").relativeTo(getClass());
    }
}
