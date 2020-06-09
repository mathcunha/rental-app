package com.rental.api.domain;



public class AptStats {

    private Float minAptSize;
    private Float minPrice;
    private Integer minRoom;
    private Float maxAptSize;
    private Float maxPrice;
    private Integer maxRoom;

    public AptStats(Float minAptSize, Float minPrice, Integer minRoom, Float maxAptSize, Float maxPrice, Integer maxRoom) {
        this.minAptSize = minAptSize;
        this.minPrice = minPrice;
        this.minRoom = minRoom;
        this.maxAptSize = maxAptSize;
        this.maxPrice = maxPrice;
        this.maxRoom = maxRoom;
    }

    public Float getMinAptSize() {
        return minAptSize;
    }

    public Float getMinPrice() {
        return minPrice;
    }

    public Integer getMinRoom() {
        return minRoom;
    }

    public Float getMaxAptSize() {
        return maxAptSize;
    }

    public Float getMaxPrice() {
        return maxPrice;
    }

    public Integer getMaxRoom() {
        return maxRoom;
    }
}
