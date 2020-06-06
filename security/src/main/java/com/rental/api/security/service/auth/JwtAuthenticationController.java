package com.rental.api.security.service.auth;

import com.rental.api.security.domain.Role;
import com.rental.api.security.domain.RoleName;
import com.rental.api.security.domain.User;
import com.rental.api.security.repository.RoleRepository;
import com.rental.api.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class JwtAuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    private final SimpleGrantedAuthority ADMIN = new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.name());

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenProvider.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @RequestMapping(value = "/user/{id}/toggleRealtor", method = RequestMethod.POST)
    public ResponseEntity<?> toggleRealtorRole(@PathVariable("id")Long id){
        if(SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(ADMIN)) {
            User user = userRepository.findById(id).get();
            Role realtor = roleRepository.findByName(RoleName.ROLE_REALTOR).get();
            if (user.getRoles().contains(realtor)) {
                user.getRoles().remove(realtor);
            } else {
                user.getRoles().add(realtor);
            }
            return ResponseEntity.ok(userRepository.save(user));
        }else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not admin user");
        }
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ResponseEntity<?> getUserInfo(@RequestHeader String authorization){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authentication.getName());

        return ResponseEntity.ok(userDetails);
    }

    @RequestMapping(value = "/renew", method = RequestMethod.GET)
    public ResponseEntity<?> renewAuthenticationToken(@RequestHeader String authorization){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        System.out.println(authentication.getAuthorities());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authentication.getName());

        final String token = jwtTokenProvider.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }


}
