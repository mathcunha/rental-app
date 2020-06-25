package com.rental.api.controller;

import com.rental.api.domain.Apartment;
import com.rental.api.service.ApartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("${spring.data.rest.basePath}/apartments")
@CrossOrigin
public class ApartmentController {
    @Autowired
    ApartmentService service;

    @Value("${spring.data.rest.basePath}")
    private String basePath;

    @GetMapping(value = "/{id}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public Apartment findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public Page<Apartment> filter(
            @RequestParam(defaultValue = "0") Float price,
            @RequestParam(defaultValue = "0") Float aptSize,
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "0") Integer room,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String projection,
            @RequestParam(required = false) Boolean available,
            @RequestParam(defaultValue = "0") Integer page,
                                   @RequestParam(defaultValue = "10") Integer size,
                                   @RequestParam(defaultValue = "name") String sort) {
        Pageable paging = PageRequest.of(page, size, Sort.by(sort).ascending());
        return service.filter(name, aptSize, price, room, userId, available, projection, paging);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        service.delete(id);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Apartment> create(@Valid @RequestBody Apartment resource, BindingResult result) {
        Apartment persisted = service.save(resource);
        return ResponseEntity.created(URI.create(String.format("%s/apartments/%d", basePath, persisted.getId())))
                .eTag(Long.toString(persisted.getVersion()))
                .body(persisted);
    }

    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Apartment> update(@Valid @RequestBody Apartment apt, @PathVariable("id") Long id, BindingResult result) {
        apt.setId(id);
        Apartment persisted = service.save(apt);
        return ResponseEntity.ok()
                .eTag(Long.toString(persisted.getVersion()))
                .body(persisted);
    }
}
