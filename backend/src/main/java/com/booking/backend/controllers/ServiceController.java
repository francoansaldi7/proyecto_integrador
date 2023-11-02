package com.booking.backend.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.booking.backend.models.Services;
import com.booking.backend.services.impl.ServiceService;

@RestController
@RequestMapping("/api/v1/services")
public class ServiceController {
  @Autowired
  private ServiceService serviceService;

  public List<Services> getSomeServices(int quantity) {
    return serviceService.getSomeServices(quantity);
  }
  
  /**
   * Retrieves all services.
   *
   * @return List of services.
   */
  @GetMapping
  public List<Services> findAll() {
    return serviceService.findAll();
  }

  /**
   * Retrieves a service by its ID.
   *
   * @param serviceId The ID of the service to retrieve.
   * @return The service with the specified ID.
   */
  @GetMapping("/{serviceId}")
  public Optional<Services> findByIdById(@PathVariable UUID serviceId) {
    return serviceService.findById(serviceId);
  }

  /**
   * Creates a new service.
   *
   * @param service The service to be created.
   * @return The created service.
   */
  @PostMapping
  public Services createService(@RequestBody Services service) {
    return serviceService.save(service);
  }

   @PostMapping("/{serviceId}/images")
  public Services createServiceImages(@PathVariable UUID serviceId,@RequestBody Map<String, String> imageData) throws IOException {
    String base64Image = imageData.get("base64Image");
        String fileName = imageData.get("fileName");
    return serviceService.uploadImage(serviceId, base64Image, false, fileName);
  }


  //@CrossOrigin(value = {"http://localhost:5173"})
  @PostMapping("/{serviceId}/image-profile")
  public Services createServiceImageProfile(@PathVariable UUID serviceId, @RequestBody Map<String, String> imageData) throws IOException {
    String base64Image = imageData.get("base64Image");
        String fileName = imageData.get("fileName");

    System.out.println("IMAGE NAME: " + base64Image);
    
    return serviceService.uploadImage(serviceId, base64Image, true, fileName);
  }
  /**
   * Updates an existing service.
   *
   * @param serviceId      The ID of the service to update.
   * @param updatedService The service object with the updated information.
   * @return The updated service.
   */
  @PutMapping("/{serviceId}")
  public Services update(@PathVariable UUID serviceId, @RequestBody Services updatedService) {
    return serviceService.update(serviceId, updatedService);
  }

  /**
   * Deletes a service by its ID.
   *
   * @param serviceId The ID of the service to delete.
   */
  @DeleteMapping("/{serviceId}")
  public Boolean deleteById(@PathVariable UUID serviceId) {
    return serviceService.deleteById(serviceId);
  }
}
