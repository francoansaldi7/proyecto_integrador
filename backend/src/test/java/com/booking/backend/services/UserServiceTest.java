// package com.booking.backend.services;

// import com.booking.backend.models.User;
// import com.booking.backend.services.impl.UserService;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertNotNull;
// import static org.junit.jupiter.api.Assertions.fail;

// import java.util.List;
// import java.util.UUID;

// import org.junit.jupiter.api.BeforeAll;
// import org.junit.jupiter.api.Test;
// import org.springframework.boot.test.context.SpringBootTest;

// @SpringBootTest
// public class UserServiceTest {
//   private static UserService userService;
//   @BeforeAll
//   public static void setUp() {
//     userService = new UserService();
//   }

//   @Test
//     void testSaveUser() {
//         // Test case 1: Saving a new user
//         // Description: Verify that the saveUser method successfully saves a new user
//         // Preconditions: None
//         // Expected outcome: User is saved successfully
//         User user = new User(UUID.randomUUID());
//         User savedUser = userService.saveUser(user);
//         // Add assertions to verify the expected outcome
//         assertNotNull(savedUser);
//         assertEquals(savedUser.getId(), user.getId());
//         // Test case 2: Saving an existing user
//         // Description: Verify that the saveUser method updates an existing user
//         // Preconditions: The user already exists in the database
//         // Expected outcome: User is updated successfully
//         // Add test case logic here

//         // Test case 3: Saving an invalid user
//         // Description: Verify that the saveUser method handles invalid user data correctly
//         // Preconditions: The user data is invalid (e.g. missing required fields)
//         // Expected outcome: User is not saved and an error is returned
//         // Add test case logic here
//     }
//   @Test
//   void testDeleteUser() {
//       // Test case 1: Deleting a user with a valid ID
//       UUID validId = UUID.randomUUID();
//       userService.deleteUser(validId);
//       // Add assertions to verify that the user with the given ID has been deleted
  
//       // Test case 2: Deleting a user with an invalid ID (null)
//       userService.deleteUser(null);
//       // Add assertions to verify that no user has been deleted
  
//       // Test case 3: Deleting a user with an invalid ID (non-existent)
//       UUID nonExistentId = UUID.randomUUID();
//       userService.deleteUser(nonExistentId);
//       // Add assertions to verify that no user has been deleted
  
//       // Test case 4: Deleting a user with a valid ID but encountering an error during deletion
//       UUID errorId = UUID.randomUUID();
//       // Inject error scenario (e.g., mock a failing database operation)
//       userService.deleteUser(errorId);
//       // Add assertions to verify that no user has been deleted and appropriate error handling has occurred
//   }

//    @Test
//   public void testUpdateUser() {
//     // Test case: Updating existing user
//     UUID id = UUID.randomUUID();
//     User user = new User(id);
//     // Call the updateUser method
//     userService.updateUser(id, user);
//     // Assert that the user information has been updated

//     // Test case: Updating non-existing user
//     UUID nonExistingId = UUID.randomUUID();
//     User nonExistingUser = new User(nonExistingId);
//     // Call the updateUser method
//     userService.updateUser(nonExistingId, nonExistingUser);
//     // Assert that an exception is thrown or appropriate error handling is done

//   }

//       @Test
//     void testGetUserById() {
//         // Test case 1: Retrieving a user by valid ID
//         // Description: Verify that the getUser method successfully retrieves a user by their valid ID
//         // Preconditions: None
//         // Expected outcome: User is retrieved successfully

//         UUID validId = UUID.randomUUID();
//         userService.getUser(validId);
        

//         // Test case 2: Retrieving a user by invalid ID
//         // Description: Verify that the getUser method does not retrieve a user when given an invalid ID
//         // Preconditions: None
//         // Expected outcome: User is not retrieved
//         UUID invalidId = UUID.randomUUID();
//         userService.getUser(invalidId);

//          // Test case 3: Exception thrown when retrieving a user
//         // Description: Verify that an exception is thrown when an error occurs during user retrieval
//         // Preconditions: None
//         // Expected outcome: Exception is thrown
//          UUID id = UUID.randomUUID();
//         try {
//             userService.getUser(id);
//             fail("Expected an exception to be thrown");
//         } catch (Exception e) {
//             // Exception is expected
//         }
//     }

//     @Test
//     void testGetAllUsers() {
//         // Test case 1: Verify that an empty list is returned when there are no users in the database
//         // Description: Testing the getAllUsers method when the database is empty
//         // Preconditions: The database does not contain any users
//         // Expected outcome: An empty list should be returned

//         userService.getAllUsers();
//         // List<User> users = userService.getAllUsers();
//         // assertTrue(users.isEmpty(), "Expected an empty list of users");

//         // Test case 2: Verify that the correct list of users is returned when there are users in the database
//         // Description: Testing the getAllUsers method when there are users in the database
//         // Preconditions: The database contains multiple users
//         // Expected outcome: A list of all users should be returned


//         // userService.saveUser(new User("John"));
//         // userService.saveUser(new User("Jane"));
//         userService.getAllUsers();
//         // assertEquals(2, users.size(), "Expected a list of 2 users");

//         // Test case 3: Verify that the list of users is not null
//         // Description: Testing the getAllUsers method to ensure the returned list is not null
//         // Preconditions: The database contains at least one user
//         // Expected outcome: The returned list should not be null

//         // userService.saveUser(new User("John"));
//         userService.getAllUsers();
//         // assertNotNull(users, "Expected a non-null list of users");
//     }
// }
