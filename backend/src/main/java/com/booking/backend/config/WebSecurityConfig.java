package com.booking.backend.config;

import java.io.FileInputStream;
import java.security.KeyPair;
import java.security.KeyStore;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import com.booking.backend.services.impl.UserDetailsServiceImpl;
import com.booking.backend.services.impl.VerifyRoleService;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

import software.amazon.awssdk.services.xray.model.Http;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.oauth2.server.resource.web.authentication.BearerTokenAuthenticationFilter;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class WebSecurityConfig {

    @Value("${jwt.public.key}")
    RSAPublicKey key;

    @Value("${jwt.private.key}")
    RSAPrivateKey priv;


    @Autowired
    private VerifyRoleService verifyRoleService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // @formatter:off
        http
        .authorizeHttpRequests((authorize) -> authorize
                .requestMatchers(HttpMethod.POST, "/api/v1/services").hasAuthority("ADMIN")
                .anyRequest().permitAll()
                )
        .csrf((csrf) -> csrf.ignoringRequestMatchers("api/v1/**")
                )
                .httpBasic(Customizer.withDefaults())
                .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterAfter(verifyRoleService, BearerTokenAuthenticationFilter.class);

        // @formatter:on
        return http.build();
    }

    /**
     * Creates a new instance of the BearerTokenAuthenticationEntryPoint class.
     *
     * @return an instance of the BearerTokenAuthenticationEntryPoint class
     */
    @Bean
    public BearerTokenAuthenticationEntryPoint bearerTokenAuthenticationEntryPoint() {
        return new BearerTokenAuthenticationEntryPoint();
    }

    /**
     * Creates and returns a new instance of the BearerTokenAccessDeniedHandler
     * class.
     *
     * @return a new instance of the BearerTokenAccessDeniedHandler class
     */
    @Bean
    public BearerTokenAccessDeniedHandler bearerTokenAccessDeniedHandler() {
        return new BearerTokenAccessDeniedHandler();
    }

    /**
     * Creates and configures an instance of the AuthenticationManager interface.
     * 
     * @param userDetailsService An implementation of the UserDetailsService
     *                           interface that provides user details for
     *                           authentication.
     * @param passwordEncoder    An implementation of the PasswordEncoder interface
     *                           that is used to encode passwords.
     * @return An instance of the AuthenticationManager interface that can be used
     *         for authentication.
     */

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // @Bean
    // public AuthenticationManager authenticationManager(
    //         UserDetailsServiceImpl userDetailsService,
    //         BCryptPasswordEncoder passwordEncoder) {
    //     // Create a new instance of DaoAuthenticationProvider
    //     DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();

    //     // Set the userDetailsService for the authenticationProvider
    //     authenticationProvider.setUserDetailsService(userDetailsService);

    //     // Set the passwordEncoder for the authenticationProvider
    //     authenticationProvider.setPasswordEncoder(passwordEncoder);

    //     // Create a new instance of ProviderManager with the authenticationProvider
    //     return new ProviderManager(authenticationProvider);
    // }

    // @Bean
    // UserDetailsService users() {

    // return new InMemoryUserDetailsManager(
    // User.withUsername("user")
    // .password("{noop}password")
    // .authorities("app")
    // .build());
    // }

        @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();//ProviderManager implements AuthenticationManager
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        UserDetailsServiceImpl userDetailsService = new UserDetailsServiceImpl();
        System.out.println("userDetailsService: " + userDetailsService);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println("passwordEncoder: " + passwordEncoder);
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        System.out.println("provider: " + provider);
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        System.out.println("provider: " + provider);
        return provider;
    }

    

    @Bean
    JwtEncoder jwtEncoder() {
        JWK jwk = new RSAKey.Builder(this.key).privateKey(this.priv).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

}

// import com.booking.backend.security.RestAuthenticationEntryPoint;
// import com.booking.backend.security.TokenAuthenticationFilter;
// import com.booking.backend.security.TokenHelper;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import
// org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// import
// org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import
// org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import
// org.springframework.security.config.annotation.web.builders.WebSecurity;
// import
// org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import
// org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// public class WebSecurityConfig {

// @Bean
// public PasswordEncoder passwordEncoder() {
// return new BCryptPasswordEncoder();
// }

// @Autowired
// private CustomUserDetailsService jwtUserDetailsService;
// @Autowired
// private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

// @Bean
// @Override
// public AuthenticationManager authenticationManagerBean() throws Exception {
// return super.authenticationManagerBean();
// }

// @Override
// public void configure( AuthenticationManagerBuilder auth ) throws Exception {
// auth.authenticationProvider(daoAuthenticationProvider());
// }

// @Bean
// public DaoAuthenticationProvider daoAuthenticationProvider(){
// DaoAuthenticationProvider provider= new DaoAuthenticationProvider();
// provider.setPasswordEncoder(passwordEncoder());
// provider.setUserDetailsService(jwtUserDetailsService);
// return provider;
// }

// @Autowired
// TokenHelper tokenHelper;

// @Override
// protected void configure(HttpSecurity http) throws Exception {
// http
// .csrf().disable()
// .sessionManagement().sessionCreationPolicy( SessionCreationPolicy.STATELESS
// ).and()
// .exceptionHandling()
// .authenticationEntryPoint( restAuthenticationEntryPoint )
// .and()
// .authorizeRequests()
// .antMatchers(
// "/auth/login",
// "/auth/register",
// "/auth/refresh",
// "/user/me"
// ).permitAll()
// .antMatchers(HttpMethod.POST,"/reservas/**").authenticated()
// .antMatchers("user/**").authenticated()
// .and()
// .addFilterBefore(new TokenAuthenticationFilter(tokenHelper,
// jwtUserDetailsService), BasicAuthenticationFilter.class);
// HeadersConfigurer<HttpSecurity> headers = http.headers();
// headers.cacheControl();
// headers.frameOptions();
// headers.xssProtection();

// }

// @Override
// public void configure(WebSecurity web) throws Exception {
// web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**","/swagger-ui/",
// "/v3/api-docs/");
// }

// @Bean
// CorsConfigurationSource corsConfigurationSource(){
// CorsConfiguration config = new
// CorsConfiguration().applyPermitDefaultValues();
// config.addExposedHeader("Authorization");
// UrlBasedCorsConfigurationSource source = new
// UrlBasedCorsConfigurationSource();
// source.registerCorsConfiguration("/**", config);
// return source;
// }

// }
