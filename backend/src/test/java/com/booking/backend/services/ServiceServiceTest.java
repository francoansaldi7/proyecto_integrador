// package com.booking.backend.services;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertNotNull;
// import static org.junit.jupiter.api.Assertions.fail;

// import java.util.UUID;

// import org.junit.jupiter.api.BeforeAll;
// import org.junit.jupiter.api.Test;
// import org.springframework.boot.test.context.SpringBootTest;

// import com.booking.backend.models.Services;
// import com.booking.backend.services.impl.ServiceService;

// @SpringBootTest
// public class ServiceServiceTest {
  
//   private static ServiceService serviceService;

//   @BeforeAll
//   public static void setUp() {
//     serviceService = new ServiceService();
//   }

//    @Test
//     void testsave() {
//         // Test case 1: Saving a new service successfully
//         // Description: Verify that the save method successfully saves a new service
//         // Preconditions: None
//         // Expected outcome: Service is saved successfully
//         // UUID validId = UUID.randomUUID();
//         Services service = new Services(UUID.randomUUID(), "Service");
//         Services savedService = serviceService.save(service);
//         // Add assertions to check if the savedService is saved correctly
//         assertNotNull(savedService);

//         // Test case 2: Saving a service with null data
//         // Description: Verify that an exception is thrown when saving a service with null data
//         // Preconditions: None
//         // Expected outcome: An exception is thrown
//         // try {
//         //     serviceService.save(null);
//         //     fail("Expected an exception to be thrown");
//         // } catch (Exception e) {
//         //     // Exception is expected
//         // }
//         // Add assertions to check if the appropriate exception is thrown
//     }

//     @Test
//     void testdeleteById() {
//         // Test case 1: Deleting a service with a valid ID
//         // Description: Verify that the service is deleted successfully with a valid ID
//         // Preconditions: None
//         // Expected outcome: Service is deleted successfully
//         UUID validId = UUID.randomUUID();
//         serviceService.deleteById(validId);
//         // Add assertions to check if the service is deleted correctly

//         // Test case 2: Deleting a service with a null ID
//         // Description: Verify that an exception is thrown when deleting a service with a null ID
//         // Preconditions: None
//         // Expected outcome: An exception is thrown
//         UUID nullId = null;
//         try {
//             serviceService.deleteById(nullId);
//             fail("Expected an exception to be thrown");
//         } catch (Exception e) {
//             // Exception is expected
//         }
//         // Add assertions to check if the appropriate exception is thrown
//     }

//     @Test
//     void testupdate() {
//         // Test case 1: Updating a service with a valid ID
//         // Description: Verify that the service is updated successfully with a valid ID
//         // Preconditions: None
//         // Expected outcome: Service is updated successfully
//         Services service = new Services(UUID.randomUUID(), "Service");
//         UUID validId = UUID.randomUUID();
//         Services updatedService = serviceService.update(validId, service);
//         // Add assertions to check if the service is updated correctly
//         assertNotNull(updatedService);
//         assertEquals(service, updatedService);
//         // Test case 2: Updating a service with a null ID
//         // Description: Verify that an exception is thrown when updating a service with a null ID
//         // Preconditions: None
//         // Expected outcome: An exception is thrown
//         UUID nullId = null;
//         Services nullService = null;    
//         try {
//             serviceService.update(nullId, nullService);
//             fail("Expected an exception to be thrown");
//         } catch (Exception e) {
//             // Exception is expected
//         }
//         // Add assertions to check if the appropriate exception is thrown
//     }

//     @Test
//     void testfindById() {
//         // Test case 1: Retrieving a service with a valid ID
//         // Description: Verify that the service is retrieved successfully with a valid ID
//         // Preconditions: Service with a valid ID exists
//         // Expected outcome: Service is retrieved successfully
//         UUID validId = UUID.randomUUID();
//         serviceService.findById(validId);
//         // Add assertions to check if the service is retrieved correctly

//         // Test case 2: Retrieving a service with a null ID
//         // Description: Verify that an exception is thrown when retrieving a service with a null ID
//         // Preconditions: None
//         // Expected outcome: An exception is thrown
//         UUID nullId = null;
//         try {
//              serviceService.findById(nullId);
//             fail("Expected an exception to be thrown");
//         } catch (Exception e) {
//             // Exception is expected
//         }
//         // Add assertions to check if the appropriate exception is thrown
//     }

//     @Test
//     void testfindAll() {
//         // Test case 1: Retrieving all services
//         // Description: Verify that the findAll method successfully retrieves all services
//         // Preconditions: Multiple services exist in the database
//         // Expected outcome: The method should return a list of all services
//         serviceService.findAll();
//         // Add assertions to check if the list of services is retrieved correctly

//         // Test case 2: Retrieving all services when the database is empty
//         // Description: Verify that the findAll method handles an empty database correctly
//         // Preconditions: The database is empty
//         // Expected outcome: The method should return an empty list
//         // ...

//         // Test case 3: Retrieving all services when the database contains a large number of services
//         // Description: Verify that the findAll method handles a large database correctly
//         // Preconditions: The database contains a large number of services
//         // Expected outcome: The method should return a list of all services
//         // ...

//         // Test case 4: Retrieving all services when the database contains duplicate services
//         // Description: Verify that the findAll method handles duplicate services correctly
//         // Preconditions: The database contains duplicate services
//         // Expected outcome: The method should return a list of all unique services
//         // ...

//         // Test case 5: Retrieving all services when the database contains invalid services
//         // Description: Verify that the findAll method handles invalid services correctly
//         // Preconditions: The database contains invalid services
//         // Expected outcome: The method should return a list of all valid services
//         // ...
//     }
// }
