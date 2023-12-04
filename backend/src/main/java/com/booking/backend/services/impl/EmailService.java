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

 public String bookingInfo( String username, String email, String service, String initialDate, String endingDate, float totalPrice) {
    return "<div style='text-align: center; border-radius: 15px; padding: 20px; font-family: sans-serif; background: linear-gradient(180deg,rgb(117 87 141), #3003e1 100%); color:white;'>"
                + "<h1>GloCast.com</h1>"
  + "<div style='background-color: #fff; border-radius: 15px; border: solid 2px green'>"
  + "<h3 style='color: #333'>Nombre de usuario: " + username + "</h3>"
                + "<h3 style='color: #333'>Email: " + email + "</h3>"
                + "<h3 style='color: #333'>Servicio Reservado: " + service + "</h3>" +
                "<h3 style='color: #333'>Fecha de Inicio: " + initialDate + "</h3>" +
                 "<h3 style='color: #333'>Fecha de Finalización: " + endingDate + "</h3>" + 
  "<h3 style='font-size: 32px; text-align: center; margin-bottom: 20px; color: #009900;'>Precio Total: " + totalPrice + "</h3>" + 
  "</div>"
                
                + "<p style='font-size: 18px; text-align: center; margin-bottom: 20px; color: #d7d5ff;'>"
                + "¡Gracias por confiar en nosotros para tu reserva! Estamos emocionados por la oportunidad de atenderte. Tu reserva ha sido confirmada con éxito. Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nosotros. ¡Esperamos verte pronto!"
                + "</p>";
  }
  /**
   * Sends a confirmation email to the specified recipient's email address with a confirmation URL.
   *
   * @param to The recipient's email address.
   * @param url The URL to be included in the email.
   * @return True if the email was sent successfully, false otherwise.
   */
  @Async("asyncTaskExecutor")
  public void sendConfirmationEmail(String to, String url, String username) {
    sendEmail(to, "Confirm your email", this.confirmationAccountMessage(url, username, to));
  }

  /**
   * Sends a booking confirmation email to the specified recipient.
   *
   * @param to           the recipient's email address
   * @param username     the username of the recipient
   * @param email        the email address of the recipient
   * @param service      the name of the service booked
   * @param initialDate  the initial date of the booking
   * @param endingDate   the ending date of the booking
   * @param totalPrice   the total price of the booking
   * @return             true if the booking confirmation email was sent successfully, false otherwise
   */
    @Async("asyncTaskExecutor")
  public void sendBookingEmail(String username, String email, String service, String initialDate, String endingDate, float totalPrice) {
      sendEmail(email, "Reserva confirmada", this.bookingInfo(username, email, service, initialDate, endingDate, totalPrice));
  }
}

