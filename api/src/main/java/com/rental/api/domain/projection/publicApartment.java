package com.rental.api.domain.projection;

import com.rental.api.domain.Apartment;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "publicApartment", types = { Apartment.class })
public interface publicApartment {

    public String getName();
    public String getComment();
    public Float getSize();
    public Float getPrice();
    public Boolean getAvailable();
    public Integer getRoom();
    public Double getLat();
    public Double getLng();
}
