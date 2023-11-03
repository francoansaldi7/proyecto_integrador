package com.booking.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.booking.backend.models.User;
import com.booking.backend.repository.IUserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private IUserRepository userRepository;
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username);
 
    System.out.println("USER: ----------------------" + user);
    System.out.println("USERNAME: " + username);
     User user1 = userRepository.findByUsername(username);
     return org.springframework.security.core.userdetails.User.withUsername(user.getUsername())
        .password(user.getPassword())
        .authorities(user.getAuthorities())
        .accountExpired(false)
        .accountLocked(false)
        .credentialsExpired(false)
        .disabled(false)
        .build();
  }
  
}
