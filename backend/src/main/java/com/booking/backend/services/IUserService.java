package com.booking.backend.services;

import com.booking.backend.models.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IUserService extends IBaseCrudService<User, User> {

    User findByUsername(String username);

     //void changePassword(String oldPassword, String newPassword);

    User save(User user);

    String getToken(User user);
}
