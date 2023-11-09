// package com.booking.backend.controllers;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertNotNull;
// import static org.junit.jupiter.api.Assertions.fail;
// import static org.mockito.Mockito.verify;
// import static org.mockito.Mockito.when;

// import java.util.Arrays;
// import java.util.List;
// import java.util.UUID;

// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.springframework.boot.test.context.SpringBootTest;

// import com.booking.backend.models.User;
// import com.booking.backend.services.impl.UserService;

// @SpringBootTest
// class UserControllerTest {
//   @Mock
//   private UserService userService;

//   @InjectMocks
//   private UserController userController;

//   @Test
//   void contextLoads() {
//     assertNotNull(userController);
//   }

//   @Test
//   void testSaveUser() {
//     // Test case 1: Saving a new user
//     // Description: Verify that the saveUser method successfully saves a new user
//     // Preconditions: None
//     // Expected outcome: User is saved successfully
//     User user = new User(UUID.randomUUID());
//     when(userService.saveUser(user)).thenReturn(user);

//     User savedUser = userController.createUser(user);
//     // Add assertions to verify the expected outcome

//     System.out.println(savedUser);
//     assertNotNull(savedUser);
//     assertEquals(savedUser.getId(), user.getId());

//     // Test case 2: Saving an existing user
//     // Description: Verify that the saveUser method updates an existing user
//     // Preconditions: The user already exists in the database
//     // Expected outcome: Launches an exception saying that the user already exists
//     // in the database.
//     // TODO: Add test case logic here
//     // try {
//     // User existingUser = new User(UUID.randomUUID());
//     // when(userService.saveUser(existingUser)).thenThrow(NullPointerException.class);
//     // userController.createUser(existingUser);
//     // fail("Expected an exception to be thrown");
//     // } catch (Exception e) {

//     // }

//     // Test case 3: Saving an invalid user
//     // Description: Verify that the saveUser method handles invalid user data
//     // correctly
//     // Preconditions: The user data is invalid (e.g. missing required fields)
//     // Expected outcome: User is not saved and an error is returned
//     // TODO: Add test case logic here

//   }

//   @Test
//   void testGetAllUsers() {
//     // Test case 1: Obtaining all users
//     // Description: Verify that the getAllUsers method returns a list of users
//     // Preconditions: Users exist in the database
//     // Expected outcome: A list of users is returned
//     List<User> users = Arrays.asList(new User(UUID.randomUUID()), new User(UUID.randomUUID()));
//     when(userService.getAllUsers()).thenReturn(users);

//     List<User> retrievedUsers = userController.getAllUsers();

//     assertNotNull(retrievedUsers);
//     assertEquals(users.size(), retrievedUsers.size());
//     // Add more assertions to compare the actual and expected lists of users

//     // Test case 2: Obtaining all users when there are no users
//     // Description: Verify that the getAllUsers method handles the case when no
//     // users exist
//     // Preconditions: No users exist in the database
//     // Expected outcome: An empty list is returned
//     // TODO: Add test case logic here
//   }

//   @Test
//   void testGetUserById() {
//     // Test case 1: Obtaining a user by ID
//     // Description: Verify that the getUserById method returns a user with a
//     // specific ID
//     // Preconditions: A user with the specified ID exists in the database
//     // Expected outcome: The user with the specified ID is returned
//     UUID userId = UUID.randomUUID();
//     User user = new User(userId);
//     when(userService.getUser(userId)).thenReturn(user);

//     User retrievedUser = userController.getUserById(userId);

//     assertNotNull(retrievedUser);
//     assertEquals(userId, retrievedUser.getId());
//     // Add more assertions to compare the actual and expected user details

//     // Test case 2: Obtaining a user by ID that does not exist
//     // Description: Verify that the getUserById method handles the case when the
//     // user does not exist
//     // Preconditions: No user with the specified ID exists in the database
//     // Expected outcome: Null is returned
//     // TODO: Add test case logic here
//   }

//   @Test
//   void testUpdateUser() {
//     // Test case 1: Updating an existing user
//     // Description: Verify that the updateUser method successfully updates an
//     // existing user
//     // Preconditions: An existing user with a valid ID
//     // Expected outcome: User is updated successfully
//     UUID userId = UUID.randomUUID();
//     User updatedUser = new User(userId);
//     when(userService.updateUser(userId, updatedUser)).thenReturn(updatedUser);

//     User updatedUserResponse = userController.updateUser(userId, updatedUser);

//     assertNotNull(updatedUserResponse);
//     assertEquals(userId, updatedUserResponse.getId());

//     // Test case 2: Updating a non-existing user
//     // Description: Verify that the updateUser method handles the case when updating
//     // a non-existing user
//     // Preconditions: The user with the specified ID does not exist in the database
//     // Expected outcome: An exception is thrown
//     // TODO: Add test case logic here
//   }

//   @Test
//   void testDeleteUser() {
//     // Test case 1: Deleting an existing user
//     // Description: Verify that the deleteUser method successfully deletes an
//     // existing user
//     // Preconditions: An existing user with a valid ID
//     // Expected outcome: User is deleted successfully
//     UUID userId = UUID.randomUUID();
//     userController.deleteUser(userId);
//     // Verify that the userService's deleteUser method was called with the correct
//     // userId
//     verify(userService).deleteUser(userId);

//     // Test case 2: Deleting a non-existing user
//     // Description: Verify that the deleteUser method handles the case when deleting
//     // a non-existing user
//     // Preconditions: The user with the specified ID does not exist in the database
//     // Expected outcome: No exception is thrown, and the delete operation is
//     // considered successful
//     // TODO: Add test case logic here
//   }

//   // Puedes continuar con más casos de prueba siguiendo el mismo formato

// }
