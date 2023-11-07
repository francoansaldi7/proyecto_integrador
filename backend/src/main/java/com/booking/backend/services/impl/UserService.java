package com.booking.backend.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.booking.backend.models.User;

@Service
public class UserService {
    //crea un UserService básico

    /**
     * Saves the user.
     *
     * @param user The user to be saved.
     * @return The saved user.
     */
    public User saveUser(User user) {
        // TODO: Implement saving logic here
        // Sample code:
        // Database.save(user);
        return user;
    }

    /**
     * Deletes a user with the given ID.
     *
     * @param id The ID of the user to delete.
     */
    public void deleteUser(UUID id) {
        // TODO: Implement deletion logic here
        // Sample code:
        // Database.deleteUser(id);
    }

    /**
     * Updates a user with the specified ID.
     *
     * @param id          The ID of the user to update.
     * @param updatedUser The user object with updated information.
     * @return The updated user.
     */
    public User updateUser(UUID id, User updatedUser) {
        // TODO: Implement user update logic here
        // Sample code:
        // User existingUser = Database.getUser(id);
        // if (existingUser != null) {
        //     existingUser.update(updatedUser);
        //     return existingUser;
        // }
        return updatedUser;
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param id The ID of the user to retrieve.
     * @return The user with the specified ID, or null if not found.
     */
    public User getUser(UUID id) {
        // TODO: Implement retrieval logic here
        // Sample code:
        // return Database.getUser(id);
        return new User(id);
    }

    /**
     * Retrieves all users from the database.
     *
     * @return List of all users.
     */
    public List<User> getAllUsers() {
        // TODO: Implement method logic here
        // Sample code:
        // return Database.getAllUsers();
        User user = new User(UUID.randomUUID());
        User user2 = new User(UUID.randomUUID());
        return List.of(user, user2);
    }
}
