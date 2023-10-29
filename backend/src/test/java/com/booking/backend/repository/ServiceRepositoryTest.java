package com.booking.backend.repository;

import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ServiceRepositoryTest {
    // @Autowired
    // private ServiceRepository serviceRepository;

    // @Test
    // void testsave() {
    //     // Test Case 1: Save a service successfully
    //     // Description: Verify that the save method saves a service successfully.
    //     // Preconditions: None
    //     // Expected outcome: The saved service should not be null.
    //     Service service = new Service("Cleaning");
    //     Service savedService = serviceRepository.save(service);
    //     assertNotNull(savedService);

    //     // Test Case 2: Save a service with invalid data
    //     // Description: Verify that the save method throws an exception when saving a service with invalid data.
    //     // Preconditions: Invalid service data.
    //     // Expected outcome: Should throw a SaveErrorException.
    //     assertThrows(SaveErrorException.class, () -> {
    //         Service invalidService = new Service(null); // Invalid data
    //         serviceRepository.save(invalidService);
    //     });
    // }

    // @Test
    // void testFindById() {
    //     // Assume you have a valid service in the database with a known ID.
    //     Long validServiceId = 1L;

    //     // Test Case 1: Find a service by existing ID
    //     // Description: Verify that the findById method retrieves an existing service by its ID.
    //     // Preconditions: Service with the known ID exists in the database.
    //     // Expected outcome: Should return the service with the known ID.
    //     Service retrievedService = serviceRepository.findById(validServiceId).orElse(null);
    //     assertNotNull(retrievedService);
    //     assertEquals(validServiceId, retrievedService.getId());

    //     // Test Case 2: Find a service by non-existent ID
    //     // Description: Verify that the findById method returns null when searching for a service with a non-existent ID.
    //     // Preconditions: No service exists with the provided ID.
    //     // Expected outcome: Should return null.
    //     Long nonExistentServiceId = 1000L; // Assume this ID does not exist
    //     Service nonExistentService = serviceRepository.findById(nonExistentServiceId).orElse(null);
    //     assertNull(nonExistentService);
    // }

    // @Test
    // void testupdate() {
    //     // Assume you have a valid service in the database with a known ID.
    //     Long validServiceId = 2L;

    //     // Test Case 1: Update an existing service
    //     // Description: Verify that the save method updates an existing service correctly.
    //     // Preconditions: Service with the known ID exists in the database.
    //     // Expected outcome: Should return the updated service.
    //     Service existingService = serviceRepository.findById(validServiceId).orElse(null);
    //     assertNotNull(existingService);
    //     existingService.setName("Plumbing"); // Update the name
    //     Service updatedService = serviceRepository.save(existingService);
    //     assertEquals("Plumbing", updatedService.getName());

    //     // Test Case 2: Update a non-existent service
    //     // Description: Verify that the save method throws an exception when trying to update a non-existent service.
    //     // Preconditions: No service exists with the provided ID.
    //     // Expected outcome: Should throw a SaveErrorException.
    //     Service nonExistentService = new Service();
    //     nonExistentService.setId(1000L); // Assume this ID does not exist
    //     assertThrows(SaveErrorException.class, () -> {
    //         serviceRepository.save(nonExistentService);
    //     });
    // }

    // @Test
    // void testdeleteById() {
    //     // Assume you have a valid service in the database with a known ID.
    //     Long validServiceId = 3L;

    //     // Test Case 1: Delete an existing service
    //     // Description: Verify that the delete method deletes an existing service successfully.
    //     // Preconditions: Service with the known ID exists in the database.
    //     // Expected outcome: The service should be deleted successfully.
    //     Service existingService = serviceRepository.findById(validServiceId).orElse(null);
    //     assertNotNull(existingService);
    //     serviceRepository.delete(existingService);
    //     Service deletedService = serviceRepository.findById(validServiceId).orElse(null);
    //     assertNull(deletedService);

    //     // Test Case 2: Delete a non-existent service
    //     // Description: Verify that the delete method throws an exception when trying to delete a non-existent service.
    //     // Preconditions: No service exists with the provided ID.
    //     // Expected outcome: Should throw a DeleteErrorException.
    //     Service nonExistentService = new Service();
    //     nonExistentService.setId(1000L); // Assume this ID does not exist
    //     assertThrows(DeleteErrorException.class, () -> {
    //         serviceRepository.delete(nonExistentService);
    //     });
    // }
}
