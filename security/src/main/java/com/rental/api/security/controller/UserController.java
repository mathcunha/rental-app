package com.rental.api.security.controller;

import com.rental.api.security.domain.User;
import com.rental.api.security.service.UserService;
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
import javax.validation.constraints.NotNull;
import java.net.URI;

@RestController
@RequestMapping("${spring.data.rest.basePath}/users")
@CrossOrigin
public class UserController {
    @Autowired
    UserService service;

    @Value("${spring.data.rest.basePath}")
    private String basePath;

    @GetMapping(value = "/{id}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public User findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public Page<User> filter(
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "") String email,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(defaultValue = "name") String sort) {
        Pageable paging = PageRequest.of(page, size, Sort.by(sort).ascending());
        return service.filter(name, email, paging);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        service.delete(id);
    }

    @DeleteMapping(value = "/{id}/roles/{roleId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRole(@NotNull @PathVariable("id") Long id, @NotNull @PathVariable("roleId") Long roleId) {
        service.deleteRole(id, roleId);
    }

    //https://www.mscharhag.com/api-design/http-post-put-patch
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping(value = "/{id}/roles/{roleId}")
    public void addRole(@NotNull @PathVariable("id") Long id, @NotNull @PathVariable("roleId") Long roleId) {
        service.addRole(id, roleId);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<User> create(@Valid @RequestBody User resource) {
        User persisted = service.save(resource);
        return ResponseEntity.created(URI.create(String.format("%s/users/%d", basePath, persisted.getId())))
                .body(persisted);
    }

    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<User> update(@Valid @RequestBody User apt, @PathVariable("id") Long id) {
        apt.setId(id);
        User persisted = service.save(apt);
        return ResponseEntity.ok()
                .body(persisted);
    }
}
