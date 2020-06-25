package com.rental.api.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Transient;
import javax.validation.constraints.*;

@Embeddable
public class PublicApartment {
    @Size(min=5, max=100, message = "Must have between 5 and 100 characters")
    @Column(updatable = false,length = 100)
    @NotBlank
    private String name;

    @Column(length = 300)
    @Size(max=300, message = "Please no more than 300 characters")
    @NotBlank
    private String description;

    @NotNull
    @Min(value = 0, message = "Size should not be less than 0")
    private Float aptSize;

    @NotNull
    @Min(value = 0, message = "Price should not be less than 0")
    private Float price;

    @NotNull
    @Min(value = 1, message = "Room should not be less than 1")
    private Integer room;

    @NotNull
    @Min(-90)
    @Max(90)
    private Double lat;

    @NotNull
    @Min(-180)
    @Max(180)
    private Double lng;

    @Column(insertable = false, updatable = false)
    private Long id;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getAptSize() {
        return aptSize;
    }

    public void setAptSize(Float aptSize) {
        this.aptSize = aptSize;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Integer getRoom() {
        return room;
    }

    public void setRoom(Integer room) {
        this.room = room;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
