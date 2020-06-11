package com.rental.api.domain;

import com.rental.api.security.domain.User;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "rents")
@EntityListeners(AuditingEntityListener.class)
public class Rent {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @NotNull
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @NotNull(message = "Please inform a move in date")
    @FutureOrPresent
    private LocalDate moveDate;

    @Embedded
    @NotNull
    @Valid
    private RentedApartment apartment;

    @CreatedDate
    @Column(updatable = false)
    private Date createdDate;

    @LastModifiedDate
    private Date updatedDate;

    @Version
    @Column(nullable = false)
    private Long version;

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public RentedApartment getApartment() {
        return apartment;
    }

    public void setApartment(RentedApartment apartment) {
        this.apartment = apartment;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public Long getVersion() {
        return version;
    }

    public LocalDate getMoveDate() {
        return moveDate;
    }

    public void setMoveDate(LocalDate moveDate) {
        this.moveDate = moveDate;
    }
}
