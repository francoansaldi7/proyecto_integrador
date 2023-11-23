package com.booking.backend.services.impl;

import com.booking.backend.models.Services;
import com.booking.backend.models.User;
import com.booking.backend.repository.IServiceRepository;
import com.booking.backend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class FavoriteService {

    @Autowired
    private IServiceRepository serviceRepository;

    @Autowired
    private IUserRepository userRepository;


    public void add(UUID userId, UUID serviceId) {
        User user = userRepository.findById(userId).get();
        Services services = serviceRepository.findById(serviceId).get();
        user.getFavoriteServices().add(services);
        userRepository.save(user);
    }

    public void delete(UUID userId, UUID serviceId) {
        User user = userRepository.findById(userId).get();
        Services services = serviceRepository.findById(serviceId).get();
        user.getFavoriteServices().remove(services);
        userRepository.save(user);
    }
}
