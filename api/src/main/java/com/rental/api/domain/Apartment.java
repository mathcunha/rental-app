package com.rental.api.domain;

import com.rental.api.security.domain.User;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;


@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(uniqueConstraints={@UniqueConstraint(columnNames={"name"}, name = "UK_apartment_name")})
public class Apartment {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Size(min=10, max=100, message = "Please no more than 100 characters")
    @Column(updatable = false,length = 100)
    @NotBlank
    private String name;

    @Column(length = 500)
    @Size(max=500, message = "Please no more than 500 characters")
    @NotBlank
    private String comment;

    @NotNull
    @Min(value = 0, message = "Size should not be less than 0")
    private Float size;

    @NotNull
    @Min(value = 0, message = "Price should not be less than 0")
    private Float price;

    @NotNull
    @Min(value = 1, message = "Room should not be less than 1")
    private Integer room;

    @NotNull
    private Double lat;

    @NotNull
    private Double lon;

    @NotNull(message = "Apartment realtor is required")
    @ManyToOne
    @JoinColumn(updatable = false)
    private User user;

    @NotNull
    private Boolean available;

    @CreatedDate
    @Column(updatable = false)
    private Date createdDate;

    @LastModifiedDate
    private Date updatedDate;

    @Version
    @Column(nullable = false)
    private Long version;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Float getSize() {
        return size;
    }

    public void setSize(Float size) {
        this.size = size;
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

    public Double getLon() {
        return lon;
    }

    public void setLon(Double lon) {
        this.lon = lon;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}
