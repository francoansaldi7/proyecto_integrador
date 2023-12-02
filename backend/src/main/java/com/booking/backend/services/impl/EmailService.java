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
  public String confirmationAccountMessage(String url, String username, String email) {
    return "<div style='text-align: center; border-radius: 15px; padding: 20px; font-family: sans-serif; background: linear-gradient(180deg,rgb(117 87 141), #3003e1 100%); color:white;'>"
                + "<h1>Bienvenido a GloCast.com</h1>"
                + "<h2>Nombre de usuario: " + username + "</h2>"
                + "<h2>Email: " + email + "</h2>"
                + "<p style='font-size: 18px; text-align: center; margin-bottom: 20px; color: #d7d5ff;'>"
                + "Gracias por registrarte. Si los datos anteriores son correctos, por favor, confirma tu dirección de correo electrónico haciendo clic en el siguiente botón:"
                + "</p>"
                + "<button style='padding:10px; border-radius:15px; outline:none; border:none; background-color: rgb(120 139 255); color: white; font-weight: bold; cursor:pointer' >"
                + "<a style='text-decoration: none; color: white' href='" + url + "' >Confirm email</a>"
                + "</button></div>";
  }


  /**
   * Sends a confirmation email to the specified recipient's email address with a confirmation URL.
   *
   * @param to The recipient's email address.
   * @param url The URL to be included in the email.
   * @return True if the email was sent successfully, false otherwise.
   */
  public Boolean sendConfirmationEmail(String to, String url, String username) {
    return sendEmail(to, "Confirm your email", this.confirmationAccountMessage(url, username, to));
  }
}
