package com.booking.backend.services.impl;

import java.io.IOException;
import java.time.Instant;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import com.booking.backend.models.User;
import com.booking.backend.repository.IUserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


/**
 * The VerifyRoleService class is a service class that is responsible for verifying if a user has a specific role based on a JWT token.
 * It uses the JwtDecoder and UserDetailsServiceImpl classes from the Spring Security framework to decode the token and retrieve user details.
 * 
 * @author Deivid González
 * @version v0.0.1
 */
@Component
public class VerifyRoleService extends OncePerRequestFilter {
  
  @Autowired
  JwtDecoder jwtDecoder;
  
  // @Autowired
  // UserDetailsServiceImpl userDetailsServiceImpl;

  @Autowired
  private IUserRepository userRepository;
  
  /**
   * Verifies if a user has a specific role based on a JWT token.
   * 
   * @param token The JWT token to verify.
   * @param role The required role.
   * @throws JwtException If the token is invalid.
   * @throws Exception If the user is not authorized.
   */
  // public void verifyUser(String token, String role) throws JwtException, Exception {
  //   String username = this.getUsername(this.decodeToken(token));
    
  //   if (this.isUserAuthorized(username, role) && !this.isTokenExpired(this.decodeToken(token))) {
  //     return;
  //   }
  //   throw new Exception("User not authorized");
  // }
  
  /**
   * Decodes the JWT token by extracting the token string from the authorization header and using the JwtDecoder class.
   * 
   * @param authorizationHeader The authorization header containing the JWT token.
   * @return The decoded JWT token.
   * @throws JwtException If the token is invalid.
   */
  public Jwt decodeToken(String authorizationHeader) throws JwtException {
    String jwtToken = authorizationHeader.substring("Bearer ".length()).trim();
    
    return jwtDecoder.decode(jwtToken);
  }
  
  /**
   * Retrieves the username from the decoded JWT token.
   * 
   * @param jwt The decoded JWT token.
   * @return The username.
   */
  public String getUsername(Jwt jwt) {
    return jwt.getSubject();
  }
  
  // /**
  //  * Checks if the user is authorized based on the retrieved username and required role.
  //  * It uses the UserDetailsServiceImpl class to load the user details and checks if the user has the required role.
  //  * 
  //  * @param username The username.
  //  * @param requiredRole The required role.
  //  * @return True if the user is authorized, false otherwise.
  //  */
  // public boolean isUserAuthorized(String username, String requiredRole) {
  //   UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);
    
  //   boolean hasRequiredRole = userDetails.getAuthorities().stream()
  //       .anyMatch(authority -> authority.getAuthority().equals(requiredRole));
    
  //   return hasRequiredRole;
  // }
  
  /**
   * Checks if the JWT token is expired based on the expiration time in the decoded token.
   * 
   * @param jwt The decoded JWT token.
   * @return True if the token is expired, false otherwise.
   */
  public boolean isTokenExpired(Jwt jwt) {
    Instant now = Instant.now();
    Instant expiration = jwt.getExpiresAt();
    return now.isAfter(expiration);
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    if(request.getHeader("Authorization") == null) {
      filterChain.doFilter(request, response);
      return;
    }
    Optional<User> user = userRepository.findByUsername(this.getUsername(this.decodeToken(request.getHeader("Authorization"))));
    System.out.println(user);
    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
        user.get().getUsername(), null, user.get().getAuthorities()
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);
    System.out.println(authentication.getAuthorities());
    filterChain.doFilter(request, response);
  }
}
