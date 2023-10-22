package com.booking.backend.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.booking.backend.models.Services;
import com.booking.backend.services.ServiceService;

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
void testGetAllServices() {
    // Test case 1: Obtaining all services
    // Description: Verify that the getAllServices method returns a list of services
    // Preconditions: Services exist in the database
    // Expected outcome: A list of services is returned
    List<Services> services = Arrays.asList(new Services(UUID.randomUUID(), "Service 1"), new Services(UUID.randomUUID(), "Service 2"));
    when(serviceService.getAllServices()).thenReturn(services);

    List<Services> retrievedServices = serviceController.getAllServices();

    assertNotNull(retrievedServices);
    assertEquals(services.size(), retrievedServices.size());
    // Add more assertions to compare the actual and expected lists of services

    // Test case 2: Obtaining all services when there are no services
    // Description: Verify that the getAllServices method handles the case when no services exist
    // Preconditions: No services exist in the database
    // Expected outcome: An empty list is returned
    // TODO: Add test case logic here
}

@Test
void testGetServiceById() {
    // Test case 1: Obtaining a service by ID
    // Description: Verify that the getServiceById method returns a service with a specific ID
    // Preconditions: A service with the specified ID exists in the database
    // Expected outcome: The service with the specified ID is returned
    UUID serviceId = UUID.randomUUID();
    Services service = new Services(serviceId, "Service");
    when(serviceService.getService(serviceId)).thenReturn(service);

    Services retrievedService = serviceController.getServiceById(serviceId);

    assertNotNull(retrievedService);
    assertEquals(serviceId, retrievedService.getId());
    // Add more assertions to compare the actual and expected service details

    // Test case 2: Obtaining a service by ID that does not exist
    // Description: Verify that the getServiceById method handles the case when the service does not exist
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
    Services service = new Services(UUID.randomUUID(), "Service");
    when(serviceService.saveService(service)).thenReturn(service);

    Services createdService = serviceController.createService(service);

    assertNotNull(createdService);
    assertEquals(service.getId(), createdService.getId());
    // Add more assertions to verify the expected outcome

    // Test case 2: Creating a service with invalid data
    // Description: Verify that the createService method handles invalid service data correctly
    // Preconditions: The service data is invalid (e.g. missing required fields)
    // Expected outcome: Service is not created, and an error is returned
    // TODO: Add test case logic here
}

@Test
void testUpdateService() {
    // Test case 1: Updating an existing service
    // Description: Verify that the updateService method successfully updates an existing service
    // Preconditions: An existing service with a valid ID
    // Expected outcome: Service is updated successfully
    UUID serviceId = UUID.randomUUID();
    Services updatedService = new Services(serviceId, "Updated Service");
    when(serviceService.updateService(serviceId, updatedService)).thenReturn(updatedService);

    Services updatedServiceResponse = serviceController.updateService(serviceId, updatedService);

    assertNotNull(updatedServiceResponse);
    assertEquals(serviceId, updatedServiceResponse.getId());
    // Add more assertions to verify the expected outcome

    // Test case 2: Updating a non-existing service
    // Description: Verify that the updateService method handles the case when updating a non-existing service
    // Preconditions: The service with the specified ID does not exist in the database
    // Expected outcome: An exception is thrown
    // TODO: Add test case logic here
}

@Test
void testDeleteService() {
    // Test case 1: Deleting an existing service
    // Description: Verify that the deleteService method successfully deletes an existing service
    // Preconditions: An existing service with a valid ID
    // Expected outcome: Service is deleted successfully
    UUID serviceId = UUID.randomUUID();
    serviceController.deleteService(serviceId);
    // Verify that the serviceService's deleteService method was called with the correct serviceId
    verify(serviceService).deleteService(serviceId);

    // Test case 2: Deleting a non-existing service
    // Description: Verify that the deleteService method handles the case when deleting a non-existing service
    // Preconditions: The service with the specified ID does not exist in the database
    // Expected outcome: No exception is thrown, and the delete operation is considered successful
    // TODO: Add test case logic here
}

}
