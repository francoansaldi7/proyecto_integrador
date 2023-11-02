package com.booking.backend.services;

import com.booking.backend.models.User;

import java.util.List;

public interface IUserService {

    User findById(Long id);
    User findByUsername(String username);
    List<User> findAll ();

    void changePassword(String oldPassword, String newPassword);

    User save(User user);
}
