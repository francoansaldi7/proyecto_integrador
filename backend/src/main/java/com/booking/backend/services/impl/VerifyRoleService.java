package com.booking.backend.services.impl;

import java.io.IOException;
import java.time.Instant;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationEntryPointFailureHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import com.booking.backend.models.User;
import com.booking.backend.repository.IUserRepository;
import com.booking.backend.security.BearerTokenAuthenticationEntryPointImpl;

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
  
  	private AuthenticationEntryPoint authenticationEntryPoint = new BearerTokenAuthenticationEntryPointImpl();

	private AuthenticationFailureHandler authenticationFailureHandler = new AuthenticationEntryPointFailureHandler(
			(request, response, exception) -> this.authenticationEntryPoint.commence(request, response, exception));
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
  public Jwt decodeToken(String authorizationHeader) throws JwtException, Exception {
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
    String alreadyFilteredAttributeName = getAlreadyFilteredAttributeName();
    Optional<User> user = null;
    try {
      Jwt token = this.decodeToken(request.getHeader("Authorization"));
       user = userRepository.findByUsername(this.getUsername(token));
    } catch (JwtException e) {
      OAuth2AuthenticationException e1 = new OAuth2AuthenticationException(new OAuth2Error("401", e.getMessage(), ""));
      this.authenticationEntryPoint.commence(request, response, e1 );
      return;
    } catch (Exception e) {
      OAuth2AuthenticationException e1 = new OAuth2AuthenticationException(new OAuth2Error("401", e.getMessage(), ""));
      this.authenticationEntryPoint.commence(request, response, e1 );
      return;
    }
    System.out.println(user);
    if(user.isEmpty()) {
      filterChain.doFilter(request, response);
      return;
    }
    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
        user.get().getUsername(), null, user.get().getAuthorities()
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);
    System.out.println(authentication.getAuthorities());
    request.removeAttribute(alreadyFilteredAttributeName);
    filterChain.doFilter(request, response);
  }
}
