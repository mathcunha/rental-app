package com.rental.api.service;

import com.rental.api.domain.Apartment;
import com.rental.api.domain.PublicApartment;
import com.rental.api.domain.Rent;
import com.rental.api.domain.RentedApartment;
import com.rental.api.repository.ApartmentRepository;
import com.rental.api.repository.RentRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.junit.MockitoRule;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(SpringExtension.class)
class RentServiceTest {

    @TestConfiguration
    static class RentServiceTestContextConfiguration {

        @Bean
        public RentService rentService() {
            return new RentService();
        }
    }

    @Autowired
    private RentService rentService;

    @MockBean
    private RentRepository rentRepository;

    @MockBean
    private ApartmentService aptService;

    @BeforeEach
    public void setUp() {
        Apartment apt = new Apartment();
        apt.setPublicInfo(new PublicApartment());
        apt.getPublicInfo().setPrice((float)2);

        Mockito.when(aptService.findToRent(any(Long.class)))
                .thenReturn(Optional.of(apt.getPublicInfo()));

        Mockito.when(rentRepository.save(any(Rent.class))).then(new Answer<Rent>() {
            @Override
            public Rent answer(InvocationOnMock invocation) throws Throwable {
                Rent rent = (Rent) invocation.getArgument(0);
                return  rent;
            }
        });
    }

    @Test
    void whenRenting_thenDisplayedPriceShouldBeEqualToPersistedPrice() {
        Rent rent = new Rent();
        rent.setApartment(new RentedApartment());
        rent.getApartment().setApartmentId((long)1);
        rent.getApartment().setPrice((float)2);

        rentService.save(rent);
    }

    @Test
    void whenRentingAndDisplayedPriceIsDiff_thenPriceIsNull() {
        Rent rent = new Rent();
        rent.setApartment(new RentedApartment());
        rent.getApartment().setApartmentId((long)1);
        rent.getApartment().setPrice((float)1);

        rentService.save(rent);
        assertNull(rent.getApartment().getPrice());
    }
}