package com.booking.backend.controllers;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
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
import com.booking.backend.services.impl.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
  @Autowired
  private UserService userService;

  @Autowired
  private AuthenticationManager authenticationManager;


  @Autowired
  private JwtEncoder encoder;

  @PostMapping("/login")
  public String getAuthentication(@RequestBody LoginRequest loginRequest) {
      Instant now = Instant.now();
		long expiry = 36000L;
    System.out.println("Login request: " + loginRequest.toString());
    Authentication authenticationRequest =
			UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.username(), loginRequest.password());

		Authentication authentication =
			this.authenticationManager.authenticate(authenticationRequest);
    System.out.println("Authentication: " + authentication.getAuthorities().iterator().next());
		String scope = authentication.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(" "));
    
		JwtClaimsSet claims = JwtClaimsSet.builder()
				.issuer("self")
				.issuedAt(now)
				.expiresAt(now.plusSeconds(expiry))
				.subject(authentication.getName())
				.claim("role", scope)
				.build();

    System.out.println("Claims: " + claims.toString());
		// @formatter:on
		return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
  }
  public record LoginRequest(String username, String password) {
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
