package com.booking.backend.controllers;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.backend.models.User;
import com.booking.backend.repository.IUserRepository;
import com.booking.backend.services.impl.UserService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
  @Autowired
  private UserService userService;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private IUserRepository userRepository;

  @Autowired
  private JwtEncoder encoder;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;


  public record LoginRequest(String username, String password) {}
  @PostMapping("/login")
  public String getAuthentication(@RequestBody LoginRequest loginRequest) {
     return userService.getToken(loginRequest.username, loginRequest.password);
    }
  
  /**
   * Retrieves all users.
   *
   * @return List of users.
   */
  @GetMapping
  public List<User> getAllUsers() {
    return userService.findAll();
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param userId The ID of the user to retrieve.
   * @return The user with the specified ID.
   */
  @GetMapping("/{userId}")
  public User getUserById(@PathVariable UUID userId) {
    return userService.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
  }

  /**
   * Creates a new user.
   *
   * @param user The user to be created.
   * @return The created user.
   */
  @PostMapping
  public User createUser(@RequestBody User user) {
    return userService.save(user);
  }

  /**
   * Updates an existing user.
   *
   * @param userId      The ID of the user to update.
   * @param updatedUser The user object with the updated information.
   * @return The updated user.
   */
  @PutMapping("/{userId}")
  public User updateUser(@PathVariable UUID userId, @RequestBody User updatedUser) {
    return userService.update(userId, updatedUser);
  }

  /**
   * Deletes a user by their ID.
   *
   * @param userId The ID of the user to delete.
   */
  @DeleteMapping("/{userId}")
  public void deleteUser(@PathVariable UUID userId) {
    userService.deleteById(userId);
  }
}
