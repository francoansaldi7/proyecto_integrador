package com.booking.backend.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.booking.backend.repository.IUserRepository;
import com.booking.backend.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.booking.backend.models.User;

@Service
public class UserService implements IUserService {
  @Autowired
  private IUserRepository userRepository;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserDetailsService userDetailsService;

  @Autowired
  private PasswordEncoder passwordEncoder;


  @Override
  public User findByUsername(String username) throws UsernameNotFoundException {
    User u = userRepository.findByUsername(username);
    return u;
  }

  public User findById(UUID)  {
    User u = userRepository.findById(UUID).orElse(null);
    return u;
  }

  public List<User> findAll() {
    return userRepository.findAll();
  }

  @Override
  public void changePassword(String oldPassword, String newPassword) {

    Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
    String username = currentUser.getName();

    if (authenticationManager != null) {

      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, oldPassword));
    } else {

      return;
    }


    User user = (User) userDetailsService.loadUserByUsername(username);

    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);


  }

  @Override
  public User save(User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }

  private Set<SimpleGrantedAuthority> getAuthority(User user) {
    Set<SimpleGrantedAuthority> authorities = new HashSet<>();
    authorities.add(new SimpleGrantedAuthority(user.getName()));
    return authorities;
  }
}
