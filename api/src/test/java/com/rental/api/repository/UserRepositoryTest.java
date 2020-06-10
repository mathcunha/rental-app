package com.rental.api.repository;

import com.intuit.karate.junit5.Karate;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.DEFINED_PORT)
public class UserRepositoryTest {
    @Karate.Test
    Karate testLogin() {
        return Karate.run("user/login").relativeTo(getClass());
    }

    @Karate.Test
    Karate testUserEdit() {
        return Karate.run("user/edit").relativeTo(getClass());
    }
}
