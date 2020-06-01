package com.rental.api.domain.projection;

import com.rental.api.domain.Rent;
import com.rental.api.domain.Apartment;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDate;

@Projection(name = "inlineApartment", types = { Apartment.class })
public interface inlineApartment {


}
