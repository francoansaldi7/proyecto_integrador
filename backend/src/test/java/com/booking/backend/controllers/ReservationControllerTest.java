// package com.booking.backend.controllers;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertNotNull;
// import static org.mockito.Mockito.verify;
// import static org.mockito.Mockito.when;

// import java.util.Arrays;
// import java.util.List;
// import java.util.UUID;

// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.springframework.boot.test.context.SpringBootTest;

// import com.booking.backend.models.Reservation;
// import com.booking.backend.services.impl.ReservationService;

// @SpringBootTest
// class ReservationControllerTest {
//   @Mock
//   ReservationService reservationService;

//   @InjectMocks
//   ReservationController reservationController;

//   @Test
//   void contextLoads() {
//     assertNotNull(reservationController);
//   }

//   @Test
// void testGetAllReservations() {
//     // Test case 1: Obtaining all reservations
//     // Description: Verify that the getAllReservations method returns a list of reservations
//     // Preconditions: Reservations exist in the database
//     // Expected outcome: A list of reservations is returned
//     List<Reservation> reservations = Arrays.asList(new Reservation(UUID.randomUUID()), new Reservation(UUID.randomUUID()));
//     when(reservationService.getAllReservations()).thenReturn(reservations);

//     List<Reservation> retrievedReservations = reservationController.getAllReservations();

//     assertNotNull(retrievedReservations);
//     assertEquals(reservations.size(), retrievedReservations.size());
//     // Add more assertions to compare the actual and expected lists of reservations

//     // Test case 2: Obtaining all reservations when there are no reservations
//     // Description: Verify that the getAllReservations method handles the case when no reservations exist
//     // Preconditions: No reservations exist in the database
//     // Expected outcome: An empty list is returned
//     // TODO: Add test case logic here
// }

// @Test
// void testGetReservationById() {
//     // Test case 1: Obtaining a reservation by ID
//     // Description: Verify that the getReservationById method returns a reservation with a specific ID
//     // Preconditions: A reservation with the specified ID exists in the database
//     // Expected outcome: The reservation with the specified ID is returned
//     UUID reservationId = UUID.randomUUID();
//     Reservation reservation = new Reservation(reservationId);
//     when(reservationService.getReservation(reservationId)).thenReturn(reservation);

//     Reservation retrievedReservation = reservationController.getReservationById(reservationId);

//     assertNotNull(retrievedReservation);
//     assertEquals(reservationId, retrievedReservation.getId());
//     // Add more assertions to compare the actual and expected reservation details

//     // Test case 2: Obtaining a reservation by ID that does not exist
//     // Description: Verify that the getReservationById method handles the case when the reservation does not exist
//     // Preconditions: No reservation with the specified ID exists in the database
//     // Expected outcome: Null is returned
//     // TODO: Add test case logic here
// }

// @Test
// void testCreateReservation() {
//     // Test case 1: Creating a new reservation
//     // Description: Verify that the createReservation method successfully creates a new reservation
//     // Preconditions: None
//     // Expected outcome: Reservation is created successfully
//     Reservation reservation = new Reservation(UUID.randomUUID());
//     when(reservationService.saveReservation(reservation)).thenReturn(reservation);

//     Reservation createdReservation = reservationController.createReservation(reservation);

//     assertNotNull(createdReservation);
//     assertEquals(reservation.getId(), createdReservation.getId());
//     // Add more assertions to verify the expected outcome

//     // Test case 2: Creating a reservation with invalid data
//     // Description: Verify that the createReservation method handles invalid reservation data correctly
//     // Preconditions: The reservation data is invalid (e.g. missing required fields)
//     // Expected outcome: Reservation is not created, and an error is returned
//     // TODO: Add test case logic here
// }

// @Test
// void testUpdateReservation() {
//     // Test case 1: Updating an existing reservation
//     // Description: Verify that the updateReservation method successfully updates an existing reservation
//     // Preconditions: An existing reservation with a valid ID
//     // Expected outcome: Reservation is updated successfully
//     UUID reservationId = UUID.randomUUID();
//     Reservation updatedReservation = new Reservation(reservationId);
//     when(reservationService.updateReservation(reservationId, updatedReservation)).thenReturn(updatedReservation);

//     Reservation updatedReservationResponse = reservationController.updateReservation(reservationId, updatedReservation);

//     assertNotNull(updatedReservationResponse);
//     assertEquals(reservationId, updatedReservationResponse.getId());
//     // Add more assertions to verify the expected outcome

//     // Test case 2: Updating a non-existing reservation
//     // Description: Verify that the updateReservation method handles the case when updating a non-existing reservation
//     // Preconditions: The reservation with the specified ID does not exist in the database
//     // Expected outcome: An exception is thrown
//     // TODO: Add test case logic here
// }

// @Test
// void testDeleteReservation() {
//     // Test case 1: Deleting an existing reservation
//     // Description: Verify that the deleteReservation method successfully deletes an existing reservation
//     // Preconditions: An existing reservation with a valid ID
//     // Expected outcome: Reservation is deleted successfully
//     UUID reservationId = UUID.randomUUID();
//     reservationController.deleteReservation(reservationId);
//     // Verify that the reservationService's deleteReservation method was called with the correct reservationId
//     verify(reservationService).deleteReservation(reservationId);

//     // Test case 2: Deleting a non-existing reservation
//     // Description: Verify that the deleteReservation method handles the case when deleting a non-existing reservation
//     // Preconditions: The reservation with the specified ID does not exist in the database
//     // Expected outcome: No exception is thrown, and the delete operation is considered successful
//     // TODO: Add test case logic here
// }

// }
