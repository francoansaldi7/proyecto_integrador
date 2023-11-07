package com.booking.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

/**
 * The EmailService class is a service class that provides functionality to send emails using the JavaMailSender.
 * It also includes a method to generate a confirmation account message for a given URL.
 */
@Component
public class EmailService {

  @Autowired
  JavaMailSender javaMailSender;

  @Value("${spring.mail.username}")
  private String email;

  /**
   * Sends an email to the specified recipient's email address with the given subject and body.
   *
   * @param to      the recipient's email address
   * @param subject the subject of the email
   * @param body    the body of the email
   * @return true if the email was sent successfully, false otherwise
   */
  public Boolean sendEmail(String to, String subject, String body) {
    MimeMessage message = javaMailSender.createMimeMessage();
    try {
      MimeMessageHelper helper = new MimeMessageHelper(message, false);
      helper.setSubject(subject);
      helper.setFrom(email);
      helper.setTo(to);
      helper.setText(body, true);
      javaMailSender.send(message);
      return true;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
  

  /**
   * Generates a confirmation account message with the provided URL.
   *
   * @param url The URL to be included in the message.
   * @return The confirmation account message with the URL.
   */
  public String confirmationAccountMessage(String url) {
    return "<div style='text-align: center; border-radius: 15px; padding: 20px;font-family: sans-serif; background: rgb(80,74,241); background: linear-gradient(0deg, rgba(80,74,241,1) 0%, rgba(31,0,106,1) 100%);'> <h1 style='color: white'>Welcome to Booking.com</h1><p style='font-size: 18px; text-align: center; margin-bottom: 20px; color: #d7d5ff;'>Thank you for signing up. Please confirm your email by clicking on the following link:</p> <button style='padding:10px; border-radius:15px; outline:none; border:none; background-color: #fff; color: #222; font-weight: bold; cursor:pointer' ><a style='text-decoration: none; color: #222' href='" + url + "' >Confirm email</a></button></div>";
  }


  /**
   * Sends a confirmation email to the specified recipient's email address with a confirmation URL.
   *
   * @param to The recipient's email address.
   * @param url The URL to be included in the email.
   * @return True if the email was sent successfully, false otherwise.
   */
  public Boolean sendConfirmationEmail(String to, String url) {
    return sendEmail(to, "Confirm your email", this.confirmationAccountMessage(url));
  }
}
