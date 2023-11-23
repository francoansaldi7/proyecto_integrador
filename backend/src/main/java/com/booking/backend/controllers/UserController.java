package com.booking.backend.controllers;

import com.booking.backend.models.Services;
import com.booking.backend.models.User;
import com.booking.backend.repository.IUserRepository;
import com.booking.backend.services.impl.FavoriteService;
import com.booking.backend.services.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin("*")
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

    @Autowired
    private FavoriteService favoriteService;


    public record LoginRequest(String username, String password) {
    }

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

    @PutMapping("/{userId}/favorites/{serviceId}")
    public void addFavorite(@PathVariable UUID userId, @PathVariable UUID serviceId) {
        favoriteService.add(userId, serviceId);
        System.out.println("favorito agregado " + userId + " service " + serviceId);
    }
    @DeleteMapping("/{userId}/favorites/{serviceId}")
    public void deleteFavorite(@PathVariable UUID userId, @PathVariable UUID serviceId) {
        favoriteService.delete(userId, serviceId);
        System.out.println("favorito borrado " + userId + " service " + serviceId);
    }

    @GetMapping("/{userId}/favorites")
    public List<Services> getFavoriteServices(@PathVariable UUID userId) {
        return favoriteService.getUserFavorites(userId);
    }
}
