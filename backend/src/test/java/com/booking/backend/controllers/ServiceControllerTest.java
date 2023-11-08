package com.booking.backend.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.booking.backend.models.Services;
import com.booking.backend.services.impl.ServiceService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@SpringBootTest
class ServiceControllerTest {
  @Mock
  private ServiceService serviceService;

  @InjectMocks
  private ServiceController serviceController;

  @Test
  void contextLoads() {
    assertNotNull(serviceController);
  }

  @Test
void testfindAll() {
    // Test case 1: Obtaining all services
    // Description: Verify that the findAll method returns a list of services
    // Preconditions: Services exist in the database
    // Expected outcome: A list of services is returned
    Page<Services> services = new PageImpl<>(Arrays.asList(new Services(UUID.randomUUID(), "Service 1"), new Services(UUID.randomUUID(), "Service 2")),
            PageRequest.of(1, 2), 0);
    when(serviceService.findAll(PageRequest.of(1, 2))).thenReturn(services);

    Page<Services> retrievedServices = serviceController.findAll(1, 2);

    assertNotNull(retrievedServices);
    assertEquals(services.getTotalElements(), retrievedServices.getTotalElements());
    // Add more assertions to compare the actual and expected lists of services

    // Test case 2: Obtaining all services when there are no services
    // Description: Verify that the findAll method handles the case when no services exist
    // Preconditions: No services exist in the database
    // Expected outcome: An empty list is returned
    // TODO: Add test case logic here
}

@Test
void testfindByIdById() {
    // Test case 1: Obtaining a service by ID
    // Description: Verify that the findByIdById method returns a service with a specific ID
    // Preconditions: A service with the specified ID exists in the database
    // Expected outcome: The service with the specified ID is returned
    UUID serviceId = UUID.randomUUID();
    Services service = new Services(serviceId, "Service");
    when(serviceService.findById(serviceId)).thenReturn(Optional.of(service));

    Optional<Services> retrievedService = serviceController.findByIdById(serviceId);

    assertNotNull(retrievedService);
    if (retrievedService.isPresent()) {
        assertEquals(serviceId, retrievedService.get().getId());
    }
    // Add more assertions to compare the actual and expected service details

    // Test case 2: Obtaining a service by ID that does not exist
    // Description: Verify that the findByIdById method handles the case when the service does not exist
    // Preconditions: No service with the specified ID exists in the database
    // Expected outcome: Null is returned
    // TODO: Add test case logic here
}

@Test
void testCreateService() {
    // Test case 1: Creating a new service
    // Description: Verify that the createService method successfully creates a new service
    // Preconditions: None
    // Expected outcome: Service is created successfully
    // Services service = new Services(UUID.randomUUID(), "Service");
    // when(serviceService.save(service)).thenReturn(service);

    // Services createdService = serviceController.createService(service);

    // assertNotNull(createdService);
    // assertEquals(service.getId(), createdService.getId());
    // Add more assertions to verify the expected outcome

    // Test case 2: Creating a service with invalid data
    // Description: Verify that the createService method handles invalid service data correctly
    // Preconditions: The service data is invalid (e.g. missing required fields)
    // Expected outcome: Service is not created, and an error is returned
    // TODO: Add test case logic here
}

@Test
void testupdate() {
    // Test case 1: Updating an existing service
    // Description: Verify that the update method successfully updates an existing service
    // Preconditions: An existing service with a valid ID
    // Expected outcome: Service is updated successfully
    UUID serviceId = UUID.randomUUID();
    Services updatedService = new Services(serviceId, "Updated Service");
    when(serviceService.update(serviceId, updatedService)).thenReturn(updatedService);

    Services updatedServiceResponse = serviceController.update(serviceId, updatedService);

    assertNotNull(updatedServiceResponse);
    assertEquals(serviceId, updatedServiceResponse.getId());
    // Add more assertions to verify the expected outcome

    // Test case 2: Updating a non-existing service
    // Description: Verify that the update method handles the case when updating a non-existing service
    // Preconditions: The service with the specified ID does not exist in the database
    // Expected outcome: An exception is thrown
    // TODO: Add test case logic here
}

@Test
void testdeleteById() {
    // Test case 1: Deleting an existing service
    // Description: Verify that the deleteById method successfully deletes an existing service
    // Preconditions: An existing service with a valid ID
    // Expected outcome: Service is deleted successfully
    UUID serviceId = UUID.randomUUID();
    serviceController.deleteById(serviceId);
    // Verify that the serviceService's deleteById method was called with the correct serviceId
    verify(serviceService).deleteById(serviceId);

    // Test case 2: Deleting a non-existing service
    // Description: Verify that the deleteById method handles the case when deleting a non-existing service
    // Preconditions: The service with the specified ID does not exist in the database
    // Expected outcome: No exception is thrown, and the delete operation is considered successful
    // TODO: Add test case logic here
}

}
