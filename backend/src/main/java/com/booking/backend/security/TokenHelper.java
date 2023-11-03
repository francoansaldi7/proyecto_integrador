// package com.booking.backend.security;

// import com.booking.backend.models.User;
// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import jakarta.servlet.http.HttpServletRequest;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Component;

// import java.util.Date;

// @Component
// public class TokenHelper {

//     @Value("DH Backend")
//     private String APP_NAME;

//     @Value("${JWT_SECRET}")
//     public String SECRET;


//     @Value("Authorization")
//     private String AUTH_HEADER;


//     private final Long EXPIRES_IN = 1_209_600_000L;


//     private SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS512;

//     public String getUsernameFromToken(String token) {
//         String username;
//         try {
//             final Claims claims = getAllClaimsFromToken(token);
//             username = claims.getSubject();
//         } catch (Exception e) {
//             username = null;
//         }
//         return username;
//     }

//     public Date getIssuedAtDateFromToken(String token) {
//         Date issueAt;
//         try {
//             final Claims claims = this.getAllClaimsFromToken(token);
//             issueAt = claims.getIssuedAt();
//         } catch (Exception e) {
//             issueAt = null;
//         }
//         return issueAt;
//     }


//     public String refreshToken(String token) {
//         String refreshedToken;
//         Date a = new Date();
//         try {
//             final Claims claims = this.getAllClaimsFromToken(token);
//             claims.setIssuedAt(a);
//             refreshedToken = Jwts.builder()
//                     .setClaims(claims)
//                     .setExpiration(generateExpirationDate())
//                     .signWith( SIGNATURE_ALGORITHM, SECRET )
//                     .compact();
//         } catch (Exception e) {
//             refreshedToken = null;
//         }
//         return refreshedToken;
//     }

//     public String generateToken(String username) {
//         return Jwts.builder()
//                 .setIssuer( APP_NAME )
//                 .setSubject(username)
//                 .setIssuedAt(new Date())
//                 .setExpiration(generateExpirationDate())
//                 .signWith( SIGNATURE_ALGORITHM, SECRET )
//                 .compact();
//     }


//     private Claims getAllClaimsFromToken(String token) {
//         Claims claims;
//         try {
//             claims = Jwts.parserBuilder()
//                     .setSigningKey(SECRET)
//                     .build()
//                     .parseClaimsJws(token)
//                     .getBody();
//         } catch (Exception e) {
//             claims = null;
//         }
//         return claims;
//     }

//     private Date generateExpirationDate() {
//         long expiresIn =  EXPIRES_IN;
//         return new Date(new Date().getTime() + expiresIn * 1000);
//     }

//     public Long getExpiredIn() {
//         return EXPIRES_IN;
//     }

//     public Boolean validateToken(String token, UserDetails userDetails) {
//         User user = (User) userDetails;
//         final String username = getUsernameFromToken(token);
//         final Date created = getIssuedAtDateFromToken(token);
//         return (
//                 username != null &&
//                         username.equals(userDetails.getUsername()) &&
//                         !isCreatedBeforeLastPasswordReset(created, user.getLastPasswordResetDate())
//         );
//     }

//     private Boolean isCreatedBeforeLastPasswordReset(Date created, Date lastPasswordReset) {
//         return (lastPasswordReset != null && created.before(lastPasswordReset));
//     }

//     public String getToken( HttpServletRequest request ) {
//         /**
//          *  Getting the token from Authentication header
//          *  e.g Bearer your_token
//          */
//         String authHeader = getAuthHeaderFromHeader( request );
//         if ( authHeader != null && authHeader.startsWith("Bearer ")) {
//             return authHeader.substring(7);
//         }

//         return null;
//     }

//     public String getAuthHeaderFromHeader( HttpServletRequest request ) {
//         return request.getHeader(AUTH_HEADER);
//     }
// }


