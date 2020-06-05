package com.rental.api.domain;

import com.rental.api.security.domain.User;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
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
    private Double lat;

    @NotNull
    private Double lng;

    @NotNull(message = "Apartment realtor is required")
    @ManyToOne
    @JoinColumn(updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
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
