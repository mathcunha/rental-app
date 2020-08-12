package com.rental.api.domain;


import javax.validation.ConstraintViolationException;

import com.rental.api.security.domain.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@ActiveProfiles("test")
class ApartmentTest {
    @Autowired
    private TestEntityManager entityManager;

    private User user = null;

    public synchronized User getUser(){
        if(user == null){
            User lUser = new User();
            lUser.setName("Test User");
            lUser.setUsername("testuser");
            lUser.setPassword("sdsdsds");
            lUser.setEmail("test@test.com.br");
            user = entityManager.persist(lUser);
        }
        return user;
    }

    @Test
    public void whenEmptyApt_thenApartmentShouldNotBeCreated() {
        Apartment apt = new Apartment();

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {entityManager.persist(apt);});
        assertEquals(exception.getConstraintViolations().size(), 3);
    }

    @Test
    public void whenAptHasOnlyUser_thenApartmentShouldNotBeCreated() {
        Apartment apt = new Apartment();
        apt.setUser(new User());

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {entityManager.persist(apt);});
        assertEquals(exception.getConstraintViolations().size(), 2);
    }

    @Test
    public void whenAptHasOnlyAvailability_thenApartmentShouldNotBeCreated() {
        Apartment apt = new Apartment();
        apt.setAvailable(Boolean.FALSE);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {entityManager.persist(apt);});
        assertEquals(exception.getConstraintViolations().size(), 2);
    }

    @Test
    public void whenAptHasOnlyPublicInfo_thenApartmentShouldNotBeCreated() {
        Apartment apt = new Apartment();
        apt.setPublicInfo(new PublicApartment());

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {entityManager.persist(apt);});
        assertEquals(exception.getConstraintViolations().size(), 9);
    }

    @Test
    public void whenAptHasRequiredAttrs_thenAptShouldBeCreated(){
        Apartment apt = new Apartment();
        apt.setPublicInfo(new PublicApartment());
        apt.getPublicInfo().setAptSize(1f);
        apt.getPublicInfo().setPrice(1f);
        apt.getPublicInfo().setName("Opdda");
        apt.getPublicInfo().setLat(45.0);
        apt.getPublicInfo().setLng(45.0);
        apt.getPublicInfo().setRoom(3);
        apt.getPublicInfo().setDescription("sasasa");
        apt.setUser(getUser());
        apt.setAvailable(Boolean.FALSE);
        entityManager.persist(apt);
    }
}