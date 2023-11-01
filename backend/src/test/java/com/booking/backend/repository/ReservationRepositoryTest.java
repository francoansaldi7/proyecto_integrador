// package com.booking.backend.repository;

// import static org.junit.jupiter.api.Assertions.assertNotNull;
// import static org.junit.jupiter.api.Assertions.assertThrows;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// import com.booking.backend.models.Reservation;
// import com.booking.backend.models.User;

// @SpringBootTest
// public class ReservationRepositoryTest {

//   @Autowired
//   private IReservationRepository reservationRepository;

//    @Test
//     void testSaveReservation() {
//         // Test case 1: save a reservation correctly
//         // Description: Verify that the Save method keeps the reservation correctly.
//         // Preconditions: None
//         // Expected result: you must return the saved reservation.
//         // TODO: Add assertions to check if the reservation is saved correctly
        
//         // Reservation reservation = new Reservation();
//         // Reservation savedReservation = reservationRepository.save(reservation);
//         // assertNotNull(savedReservation.getId());

//         // Test case 2: Save a reservation with invalid data
//         // Description: Verify that the Save method launches an exception when trying to save a reserve with invalid data.
//         // Preconditions: Invalid reserve data
//         // Expected result: You must launch an exception of Saverrorexception type.

//         // TODO: Add assertions to check if the appropriate exception is thrown
//         // assertThrows(SaveErrorException.class, () -> {
//         //     Reservation invalidReservation = new Reservation();
//         //     invalidReservation.setUserId(null); // Datos inválidos
//         //     reservationRepository.save(invalidReservation);
//         // });
//     }

//     @Test
//     void testFindById() {
//         // Suppose you have a valid reservation in the database with a known ID.
//         Long validReservationId = 1L;

//         // Test case 1: Find an existing ID reservation
//         // Description: Verify that the Findbyid method recovers an existing reserve for its ID.
//         // Preconditions: Reserve with the known ID exists in the database.
//         // Expected result: you must return the reservation with the known ID.
//         // Reservation retrievedReservation = reservationRepository.findById(validReservationId).orElse(null);
//         // assertNotNull(retrievedReservation);
//         // assertEquals(validReservationId, retrievedReservation.getId());

//        // Test case 2: Find a reservation by non -existent ID
//         // Description: Verify that the Findbyid method returns Null when looking for a reservation with an non -existent ID.
//         // Preconditions: There is no reservation with the ID provided.
//         // Expected result: you must return null.
//         Long nonExistentReservationId = 1000L; // Suppose this id does not exist

//         // TODO: Add assertions to check if the returned reservation is null
//         // Reservation nonExistentReservation = reservationRepository.findById(nonExistentReservationId).orElse(null);
//         // assertNull(nonExistentReservation);
//     }

//     @Test
//     void testUpdateReservation() {
//         // Suppose you have a valid reservation in the database with a known ID.
//         Long validReservationId = 2L;

//         // Test case 1: Update an existing reservation
//         // Description: Verify that the Save method updates an existing reserve correctly.
//         // Preconditions: Reserve with the known ID exists in the database.
//         // Expected result: you must return the updated reservation.

//         // TODO: Add assertions to check if the reservation is updated
//         // Reservation existingReservation = reservationRepository.findById(validReservationId).orElse(null);
//         // assertNotNull(existingReservation);
//         // existingReservation.setDate("2023-11-15"); // Actualizar la fecha
//         // Reservation updatedReservation = reservationRepository.save(existingReservation);
//         // assertEquals("2023-11-15", updatedReservation.getDate());

//         // Test case 2: Update a non -existent reservation
//         // Description: Verify that the Save method launches an exception when trying to update a non -existent reserve.
//         // Preconditions: There is no reservation with the ID provided.
//         // Expected result: You must launch an exception of Saverrorexception type.

//         // TODO: Add assertions to check if the appropriate exception is thrown
//         // Reservation nonExistentReservation = new Reservation();
//         // nonExistentReservation.setId(1000L); // Supongamos que este ID no existe
//         // assertThrows(SaveErrorException.class, () -> {
//         //     reservationRepository.save(nonExistentReservation);
//         // });
//     }

//     @Test
//     void testDeleteReservation() {
//         // Suppose you have a valid reservation in the database with a known ID.
//         Long validReservationId = 3L;

//         // Test case 1: Delete an existing reservation
//         // Description: Verify that the Delete method eliminates an existing reserve correctly.
//         // Preconditions: Reserve with the known ID exists in the database.
//         // Expected result: The reservation must be deleted successfully.

//         // TODO: Add assertions to check if the reservation is deleted correctly
//         // Reservation existingReservation = reservationRepository.findById(validReservationId).orElse(null);
//         // assertNotNull(existingReservation);
//         // reservationRepository.delete(existingReservation);
//         // Reservation deletedReservation = reservationRepository.findById(validReservationId).orElse(null);
//         // assertNull(deletedReservation);

//         // Test case 2: Delete a non -existent reservation
//         // Description: Verify that the DELETE method launches an exception when trying to eliminate a non -existent reserve.
//         // Preconditions: There is no reservation with the ID provided.
//         // Expected result: You must launch an exception of the deleteerroxception type.

//         // TODO: Add assertions to check if the appropriate exception is thrown
//         // Reservation nonExistentReservation = new Reservation();
//         // nonExistentReservation.setId(1000L); // Supongamos que este ID no existe
//         // assertThrows(DeleteErrorException.class, () -> {
//         //     reservationRepository.delete(nonExistentReservation);
//         // });
//     }
// }
