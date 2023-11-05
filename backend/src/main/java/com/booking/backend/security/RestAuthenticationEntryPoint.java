// package com.booking.backend.security;

// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.web.AuthenticationEntryPoint;

// import java.io.IOException;

// public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

//     @Override
//     public void commence(HttpServletRequest request,
//                          HttpServletResponse response,
//                          AuthenticationException authException) throws IOException {
//                             System.out.println("Unauthorized error. Message - " + authException.getMessage());
//         // This is invoked when user tries to access a secured REST resource without supplying any credentials
//         // We should just send a 401 Unauthorized response because there is no 'login page' to redirect to
//         response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
//     }

// }
