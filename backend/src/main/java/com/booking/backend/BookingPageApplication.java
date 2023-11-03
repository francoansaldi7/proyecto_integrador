package com.booking.backend;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BookingPageApplication implements CommandLineRunner {

     private static final Logger logger = LoggerFactory.getLogger(BookingPageApplication.class);

    private final Environment env;

    public BookingPageApplication(Environment env) {
        this.env = env;
    }

    @Override
    public void run(String... args) throws Exception {

        logger.info("{}", env.getProperty("JAVA_HOME"));
        logger.info("{}", env.getProperty("test.vault.dev"));
    }
    
	public static void main(String[] args) {

        SpringApplication.run(BookingPageApplication.class, args);
	}
   @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Value("${cors.allowedOrigins}")
            private String allowedOrigins;
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(allowedOrigins)
                        .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
    }
}
