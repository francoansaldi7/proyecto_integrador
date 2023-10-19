package com.booking.backend.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class UserService {
  //crea un UserService básico

/**
 * Saves the user.
 */
public void saveUser() {
  // TODO: Implement saveUser method logic
}

/**
 * Deletes a user with the given ID.
 * 
 * @param id The ID of the user to delete.
 */
public void deleteUser(UUID id) {
  // TODO: Implement the logic to delete the user with the given ID.
}

/**
 * Updates user information based on the provided UUID.
 *
 * @param id The UUID of the user to be updated.
 */
public void updateUser(UUID id) {
  // TODO: Implement update user logic
}

/**
 * Retrieves a user by their ID.
 *
 * @param id The ID of the user to retrieve.
 */
public void getUser(UUID id) {
  // TODO: Implement the logic to retrieve the user by their ID
}

  /**
 * Retrieves all users from the database.
 * 
 * @return a list of all users
 */
  public void getAllUsers() {
    // TODO: Implement logic to retrieve all users
  }
}
