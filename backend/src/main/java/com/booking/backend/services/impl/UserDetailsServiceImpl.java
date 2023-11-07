package com.booking.backend.services.impl;

import java.util.Optional;

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
    System.out.println("USERNAME: " + username);

    Optional<User> user = userRepository.findByUsername(username);
    System.out.println("user: " + user);
    System.out.println("USER: ----------------------" + user);
    System.out.println("USERNAME: " + username);
    if(user.isPresent()) {
      UserDetails userDetails = org.springframework.security.core.userdetails.User.withUsername(user.get().getUsername())
         .password(user.get().getPassword())
         .roles(user.get().getRoles())
         .accountExpired(false)
         .accountLocked(false)
         .credentialsExpired(false)
         .disabled(false)
         .build();
     System.out.println("userDetails: " + userDetails);    
     return userDetails;
      
    } else {
      throw new UsernameNotFoundException("User not found");
    }
  }
  
}
