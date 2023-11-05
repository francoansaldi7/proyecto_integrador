package com.booking.backend.services.impl;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;


@Service
public class VerifyRoleService {
  @Autowired
  JwtDecoder jwtDecoder;

  @Autowired
  UserDetailsServiceImpl userDetailsServiceImpl;

  public void verifyUser(String token, String role) throws JwtException, Exception {
     String username = this.getUsername(this.decodeToken(token));

    if(this.isUserAuthorized(username, role) && !this.isTokenExpired(this.decodeToken(token))){
      return;
    };
    throw new Exception("User not authorized");

  }
  public Jwt decodeToken(String authorizationHeader) throws JwtException {
     String jwtToken = authorizationHeader.substring("Bearer ".length()).trim();

    return jwtDecoder.decode(jwtToken);
  }

  public String getUsername (Jwt jwt) {
    return jwt.getSubject();
  }

      public boolean isUserAuthorized(String username, String requiredRole) {
        
        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);
        
        
        boolean hasRequiredRole = userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals(requiredRole));
        
        return hasRequiredRole;
    }
  public boolean isTokenExpired(Jwt jwt) {
    Instant now = Instant.now();
    Instant expiration = jwt.getExpiresAt();
    return now.isAfter(expiration);
}

}
