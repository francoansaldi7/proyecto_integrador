// package com.booking.backend.repository;

// import static org.junit.jupiter.api.Assertions.assertNotNull;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// import com.booking.backend.models.User;

// @SpringBootTest
// public class UserRepositoryTest {
  
//   @Autowired
//   private IUserRepository userRepository;

//   // The tests are commented since not having configured
//   // A database in the project, the tests fail

//   // TODO: Add tests for the UserRepository

//   // @Test
//   //   void testSaveUser() {
//   //       // Test Case 1: Save a user successfully
//   //       // Description: Verify that the save method saves a user successfully.
//   //       // Preconditions: None
//   //       // Expected outcome: The saved user should not be null.
//   //       User user = new User("JohnDoe");
//   //       User savedUser = userRepository.save(user);
//   //       assertNotNull(savedUser);

//   //       // Test Case 2: Save a user with invalid data
//   //       // Description: Verify that the save method throws an exception when saving a user with invalid data.
//   //       // Preconditions: Invalid user data.
//   //       // Expected outcome: Should throw a SaveErrorException.
//   //       assertThrows(SaveErrorException.class, () -> {
//   //           User invalidUser = new User(null); // Invalid data
//   //           userRepository.save(invalidUser);
//   //       });
//   //   }

//   //   @Test
//   //   void testFindById() {
//   //       // Assume you have a valid user in the database with a known ID.
//   //       Long validUserId = 1L;

//   //       // Test Case 1: Find a user by existing ID
//   //       // Description: Verify that the findById method retrieves an existing user by their ID.
//   //       // Preconditions: User with the known ID exists in the database.
//   //       // Expected outcome: Should return the user with the known ID.
//   //       User retrievedUser = userRepository.findById(validUserId).orElse(null);
//   //       assertNotNull(retrievedUser);
//   //       assertEquals(validUserId, retrievedUser.getId());

//   //       // Test Case 2: Find a user by non-existent ID
//   //       // Description: Verify that the findById method returns null when searching for a user with a non-existent ID.
//   //       // Preconditions: No user exists with the provided ID.
//   //       // Expected outcome: Should return null.
//   //       Long nonExistentUserId = 1000L; // Assume this ID does not exist
//   //       User nonExistentUser = userRepository.findById(nonExistentUserId).orElse(null);
//   //       assertNull(nonExistentUser);
//   //   }

//   //   @Test
//   //   void testUpdateUser() {
//   //       // Assume you have a valid user in the database with a known ID.
//   //       Long validUserId = 2L;

//   //       // Test Case 1: Update an existing user
//   //       // Description: Verify that the save method updates an existing user correctly.
//   //       // Preconditions: User with the known ID exists in the database.
//   //       // Expected outcome: Should return the updated user.
//   //       User existingUser = userRepository.findById(validUserId).orElse(null);
//   //       assertNotNull(existingUser);
//   //       existingUser.setName("JaneDoe"); // Update the name
//   //       User updatedUser = userRepository.save(existingUser);
//   //       assertEquals("JaneDoe", updatedUser.getName());

//   //       // Test Case 2: Update a non-existent user
//   //       // Description: Verify that the save method throws an exception when trying to update a non-existent user.
//   //       // Preconditions: No user exists with the provided ID.
//   //       // Expected outcome: Should throw a SaveErrorException.
//   //       User nonExistentUser = new User();
//   //       nonExistentUser.setId(1000L); // Assume this ID does not exist
//   //       assertThrows(SaveErrorException.class, () -> {
//   //           userRepository.save(nonExistentUser);
//   //       });
//   //   }

//   //   @Test
//   //   void testDeleteUser() {
//   //       // Assume you have a valid user in the database with a known ID.
//   //       Long validUserId = 3L;

//   //       // Test Case 1: Delete an existing user
//   //       // Description: Verify that the delete method deletes an existing user successfully.
//   //       // Preconditions: User with the known ID exists in the database.
//   //       // Expected outcome: The user should be deleted successfully.
//   //       User existingUser = userRepository.findById(validUserId).orElse(null);
//   //       assertNotNull(existingUser);
//   //       userRepository.delete(existingUser);
//   //       User deletedUser = userRepository.findById(validUserId).orElse(null);
//   //       assertNull(deletedUser);

//   //       // Test Case 2: Delete a non-existent user
//   //       // Description: Verify that the delete method throws an exception when trying to delete a non-existent user.
//   //       // Preconditions: No user exists with the provided ID.
//   //       // Expected outcome: Should throw a DeleteErrorException.
//   //       User nonExistentUser = new User();
//   //       nonExistentUser.setId(1000L); // Assume this ID does not exist
//   //       assertThrows(DeleteErrorException.class, () -> {
//   //           userRepository.delete(nonExistentUser);
//   //       });
//   //   }
// }
