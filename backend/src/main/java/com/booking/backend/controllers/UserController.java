package com.booking.backend.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.backend.models.User;
import com.booking.backend.services.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
  @Autowired
  private UserService userService;

  /**
   * Retrieves all users.
   */
  @GetMapping
  public void getAllUsers() {
    // Call the getAllUsers method from the userService to retrieve all users
    userService.getAllUsers();
  }

  
/**
 * Retrieves a user by their ID.
 *
 * @param userId The ID of the user to retrieve.
 */
@GetMapping("/{userId}")
public void getUserById(@PathVariable UUID userId) {
  // Call the userService to get the user by ID
  userService.getUser(userId);
}

  // Endpoint para crear un nuevo usuario
  @PostMapping
  public void createUser(@RequestBody User user) {
    userService.saveUser();
  }

  // // Endpoint para actualizar un usuario existente
  // @PutMapping("/{userId}")
  // public User updateUser(@PathVariable Long userId, @RequestBody User user) {
  //   return userService.updateUser(userId, user);
  // }

  // // Endpoint para eliminar un usuario por su ID
  // @DeleteMapping("/{userId}")
  // public void deleteUser(@PathVariable Long userId) {
  //   userService.deleteUser(userId);
  // }

}
