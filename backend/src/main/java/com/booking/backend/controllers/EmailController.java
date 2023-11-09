// package com.booking.backend.controllers;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.booking.backend.services.impl.EmailService;

// @RestController
// @RequestMapping("/email")
// public class EmailController {

//   @Autowired
//   private EmailService emailService;
  
//   @GetMapping
//   public String sendEmail() {
//     emailService.sendEmail("bienvenidoexperto@gmail.com", "Test Confirmation message", emailService.confirmationAccountMessage("https://www.google.com"));
//     return "Email sent successfully: " + emailService.sendEmail("bienvenidoexperto@gmail.com", "Test Confirmation message", emailService.confirmationAccountMessage("https://www.google.com"));
//   }
// }
