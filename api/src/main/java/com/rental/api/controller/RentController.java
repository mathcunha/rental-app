package com.rental.api.controller;

import com.rental.api.domain.Apartment;
import com.rental.api.domain.Rent;
import com.rental.api.repository.RentRepository;
import com.rental.api.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("${spring.data.rest.basePath}/rents")
@CrossOrigin
public class RentController {
    @Autowired
    private RentService service;

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void create(@Valid @RequestBody Rent rent){
        service.save(rent);
    }
}
