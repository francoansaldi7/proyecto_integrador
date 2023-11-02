package com.booking.backend.repository;

import java.util.Optional;
import java.util.UUID;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;


@Repository
@Transactional
public interface IUserRepository extends JpaRepository<User, UUID> {
    User findByUsername(String username );
    Optional <User> findById(UUID Id);
}
