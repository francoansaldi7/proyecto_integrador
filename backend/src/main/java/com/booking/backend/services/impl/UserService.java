package com.booking.backend.services.impl;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.booking.backend.models.Role;
import com.booking.backend.models.User;
import com.booking.backend.repository.IRoleRepository;
import com.booking.backend.repository.IUserRepository;
import com.booking.backend.services.IUserService;

import jakarta.validation.Valid;

@Service
public class UserService implements IUserService {
  @Autowired
  private IUserRepository userRepository;

  // @Autowired
  // private AuthenticationManager authenticationManager;

  // @Autowired
  // private UserDetailsService userDetailsService;


  @Autowired
  private IRoleRepository roleRepository;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;


  @Autowired
  private JwtEncoder encoder;

  @Override
  public User findByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username);
    System.out.println(user);
    return user;
  }

  public Optional<User> findById(UUID id)  {
    Optional<User> u = userRepository.findById(id);
    return u;
  }

  public List<User> findAll() {
    return userRepository.findAll();
  }

  // @Override
  // public void changePassword(String oldPassword, String newPassword) {

  //   Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
  //   String username = currentUser.getName();

  //   if (authenticationManager != null) {

  //     authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, oldPassword));
  //   } else {

  //     return;
  //   }


  //   User user = (User) userDetailsService.loadUserByUsername(username);

  //   user.setPassword(passwordEncoder.encode(newPassword));
  //   userRepository.save(user);


  // }

  @Override
  public User save(User user) {
   user.setPassword(passwordEncoder.encode(user.getPassword()));
   if(user.getRole().getId() == 2) {
   user.setRole(new Role(2, "ADMIN"));
    
   } else {
     user.setRole(new Role(1, "USER"));
   }
    User userSaved = userRepository.save(user);
    return userSaved;
  }

  private Set<SimpleGrantedAuthority> getAuthority(User user) {
    Set<SimpleGrantedAuthority> authorities = new HashSet<>();
    authorities.add(new SimpleGrantedAuthority(user.getName()));
    return authorities;
  }

  @Override
  public Boolean deleteById(UUID id) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'deleteById'");
  }

  @Override
  public User update(UUID id, @Valid User t) throws RuntimeException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'update'");
  }

  @Override
  public String getToken(User user) {
    Instant now = Instant.now();
		long expiry = 36000L;

		// SCOPE:
		// String scope = authentication.getAuthorities().stream()
		// 		.map(GrantedAuthority::getAuthority)
		// 		.collect(Collectors.joining(" "));
    
		JwtClaimsSet claims = JwtClaimsSet.builder()
				.issuer("self")
				.issuedAt(now)
				.expiresAt(now.plusSeconds(expiry))
				.subject(user.getName())
				.claim("role", user.getRole().toString())
				.build();

    System.out.println("Claims: " + claims.toString());
		// @formatter:on
		return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
  }
}
