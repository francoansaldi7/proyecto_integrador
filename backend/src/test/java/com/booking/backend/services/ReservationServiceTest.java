package com.booking.backend.services;

import static org.junit.jupiter.api.Assertions.fail;

import java.util.UUID;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.booking.backend.services.ReservationService;

@SpringBootTest
public class ReservationServiceTest {
  private static ReservationService reservationService;

  @BeforeAll
  public static void setUp() {
    reservationService = new ReservationService();
  }
  @Test
void testSaveReservation() {
    // Test case 1: Verify that the reservation is saved successfully
    // TODO: Implement test case

    // Test case 2: Verify that an exception is thrown when saving fails
    // TODO: Implement test case
}

 @Test
  public void testDeleteReservation() {
    UUID id;
    // Test case 1: Delete an existing reservation
    // Reservation reservation1 = new Reservation(UUID.randomUUID());
    UUID id1 = UUID.randomUUID();
    reservationService.deleteReservation(id1);;
    // TODO: Assert that the reservation has been successfully deleted

    // Test case 2: Delete a non-existing reservation
    UUID nonExistingId = UUID.randomUUID();
    reservationService.deleteReservation(nonExistingId);
    // assertThrows(ReservationNotFoundException.class, () -> {
    //   deleteReservation(nonExistingId);
    // });
  }

      @Test
    public void testUpdateReservation() {
        // Test case 1: Updating a reservation with a valid ID
        // Description: Verify that the reservation is updated successfully with a valid ID
        // Preconditions: None
        // Expected outcome: The reservation is updated successfully
        UUID validId = UUID.randomUUID();
        reservationService.updateReservation(validId);
        // Add assertions to check if the reservation is updated correctly

        // Test case 2: Updating a reservation with a null ID
        // Description: Verify that an exception is thrown when updating a reservation with a null ID
        // Preconditions: None
        // Expected outcome: An exception is thrown
        UUID nullId = null;
        try {
            reservationService.updateReservation(nullId);
            fail("Expected an exception to be thrown");
        } catch (Exception e) {
            // Exception is expected
        }
        // Add assertions to check if the appropriate exception is thrown
    }
}
