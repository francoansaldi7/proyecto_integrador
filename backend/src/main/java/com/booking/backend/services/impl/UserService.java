package com.booking.backend.services.impl;

import com.booking.backend.models.Role;
import com.booking.backend.models.User;
import com.booking.backend.repository.IRoleRepository;
import com.booking.backend.repository.IUserRepository;
import com.booking.backend.services.IUserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtEncoder encoder;

    @Override
    public User findByUsername(String username) throws UsernameNotFoundException {
        System.out.println("USERNAME: " + username);
        Optional<User> user = userRepository.findByUsername(username);
        System.out.println(user);
        return user.get();
    }

    public Optional<User> findById(UUID id) {
        Optional<User> u = userRepository.findById(id);
        return u;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    // @Override
    // public void changePassword(String oldPassword, String newPassword) {

    // Authentication currentUser =
    // SecurityContextHolder.getContext().getAuthentication();
    // String username = currentUser.getName();

    // if (authenticationManager != null) {

    // authenticationManager.authenticate(new
    // UsernamePasswordAuthenticationToken(username, oldPassword));
    // } else {

    // return;
    // }

    // User user = (User) userDetailsService.loadUserByUsername(username);

    // user.setPassword(passwordEncoder.encode(newPassword));
    // userRepository.save(user);

    // }

    @Override
    public User save(User user, String origin) {
        String oldPassword = user.getPassword();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole().getId() == 2) {
            user.setRole(new Role(2, "ADMIN"));

        } else {
            user.setRole(new Role(1, "USER"));
        }
        User userSaved = userRepository.save(user);
        System.out.println("USER: " + user.getUsername() + " " + user.getPassword());
        String token = getToken(user.getUsername(), oldPassword);
        System.out.println("ORIGIN: " + origin);
        emailService.sendConfirmationEmail(user.getEmail(), origin + "/confirm?token=" + token, user.getUsername());
        return userSaved;
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(user.getName()));
        return authorities;
    }

    @Override
    public Boolean deleteById(UUID id) {
        userRepository.deleteById(id);
        return true;
    }

    @Override
    public User update(UUID id, User user) throws RuntimeException {
        User userToUpdate = userRepository.findById(id).orElse(null);
        if (userToUpdate != null) {
            if (user.getRole().getId() == 2) {
                userToUpdate.setRole(new Role(2, "ADMIN"));

            } else {
                userToUpdate.setRole(new Role(1, "USER"));
            }
            User updatedUser = userRepository.save(userToUpdate);
            return updatedUser;
        }
        throw new RuntimeException("User not found");
    }

    @Override
    public String getToken(String username, String password) {
        Instant now = Instant.now();
        long expiry = 36000L;

        try {
            Optional<User> userDetails = userRepository.findByUsername(username);
            System.out.println(userDetails.get().getPassword());
            System.out.println(password);
            System.out.println(passwordEncoder.matches(password, userDetails.get().getPassword()));
            if (userDetails.isPresent()
                    && passwordEncoder.matches(password, userDetails.get().getPassword())) {
                // El usuario se ha autenticado correctamente
                String usernameSaved = userDetails.get().getUsername();
                String scope = userDetails.get().getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(" "));

                JwtClaimsSet claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .issuedAt(now)
                        .expiresAt(now.plusSeconds(expiry))
                        .subject(usernameSaved)
                        .claim("rol", scope)
                        .claim("name", userDetails.get().getName())
                        .claim("id", userDetails.get().getId())
                        .build();

                String token = encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

                return token;
            } else {
                // El usuario no se autenticó correctamente
                return "Usuario o contraseña incorrectos";
            }
        } catch (UsernameNotFoundException e) {
            return "Usuario no encontrado";
        }
    }

    @Override
    public User save(@Valid User t) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }
}
