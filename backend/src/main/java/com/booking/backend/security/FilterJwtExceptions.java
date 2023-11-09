package com.booking.backend.security;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.filter.OncePerRequestFilter;

import com.booking.backend.models.User;
import com.booking.backend.repository.IUserRepository;
import com.booking.backend.services.impl.VerifyRoleService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class FilterJwtExceptions extends OncePerRequestFilter{

  private AuthenticationEntryPoint authenticationEntryPoint = new BearerTokenAuthenticationEntryPointImpl();

  @Autowired
  private VerifyRoleService verifyRoleService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
 
    try {
      verifyRoleService.decodeToken(request.getHeader("Authorization"));
   
    } catch (JwtException e) {
      OAuth2AuthenticationException e1 = new OAuth2AuthenticationException(new OAuth2Error("401", e.getMessage(), ""));
      this.authenticationEntryPoint.commence(request, response, e1 );
      return;
    } catch (Exception e) {
      OAuth2AuthenticationException e1 = new OAuth2AuthenticationException(new OAuth2Error("401", e.getMessage(), ""));
      this.authenticationEntryPoint.commence(request, response, e1 );
      return;
    }

    filterChain.doFilter(request, response);
        
  }
  
}
