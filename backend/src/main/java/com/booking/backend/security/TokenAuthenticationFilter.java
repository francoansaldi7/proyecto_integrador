// package com.booking.backend.security;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.web.filter.OncePerRequestFilter;

// import java.io.IOException;

// public class TokenAuthenticationFilter extends OncePerRequestFilter {
//     private TokenHelper tokenHelper;

//     private UserDetailsService userDetailsService;

//     @Value("${header}")
//     private String header;

//     public TokenAuthenticationFilter(TokenHelper tokenHelper, UserDetailsService userDetailsService) {
//         this.tokenHelper = tokenHelper;
//         this.userDetailsService = userDetailsService;
//     }


//     @Override
//     public void doFilterInternal(
//             HttpServletRequest request,
//             HttpServletResponse response,
//             FilterChain chain
//     ) throws IOException, ServletException {
//         response.setHeader("Access-Control-Allow-Origin", "*");
//         response.setHeader("Access-Control-Allow-Credentials", "true");
//         response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//         response.setHeader("Access-Control-Max-Age", "3600");
//         response.setHeader("Access-Control-Allow-Headers", "Authorization, content-type,Accept, X-Requested-With, Cache-Control, Authorization, x-auth-token");
//         String username;
//         String authToken = tokenHelper.getToken(request);

//         if (authToken != null) {
//             // get username from token
//             username = tokenHelper.getUsernameFromToken(authToken);
//             if (username != null) {
//                 // get user
//                 UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//                 if (userDetails != null && tokenHelper.validateToken(authToken, userDetails)) {
//                     // create authentication
//                     TokenBasedAuthentication authentication = new TokenBasedAuthentication(userDetails);
//                     authentication.setToken(authToken);
//                     SecurityContextHolder.getContext().setAuthentication(authentication);
//                 }
//             }
//         }
//         chain.doFilter(request, response);
//     }

// }
