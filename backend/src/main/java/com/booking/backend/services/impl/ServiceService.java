package com.booking.backend.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.backend.models.ServiceImage;
import com.booking.backend.models.Services;
import com.booking.backend.repository.IServiceImageRepository;
import com.booking.backend.repository.IServiceRepository;
import com.booking.backend.services.IServiceService;

import jakarta.validation.Valid;

@Service
public class ServiceService implements IServiceService {
  
  public ServiceService() {
    
  }

  @Autowired
  private IServiceRepository serviceRepository;

  @Autowired
  private ServiceImageService serviceImageService;

  @Autowired
  private TypeOfServiceService typeOfServiceService;
 /**
   * Saves the service.
   *
   * @param service The service to be saved.
   * @return The saved service.
   */
  public Services save(Services service) throws RuntimeException {
    Services serviceExists = serviceRepository.findById(service.getId()).orElse(null);
    if(serviceExists != null){
      throw new RuntimeException("Service already exists");
    }
    List<ServiceImage> serviceImages = new ArrayList<>();
    service.getGallery().forEach(img -> {

      ServiceImage savedImage = serviceImageService.save(img);
      serviceImages.add(savedImage);
    
    });

    service.setTypeOfService(typeOfServiceService.findById(service.getTypeOfService().getId()).get());
    service.setGallery(serviceImages);
    return serviceRepository.save(service);
  }

  /**
   * Deletes a service with the given ID.
   *
   * @param id The ID of the service to delete.
   */
  public Boolean deleteById(UUID id) {
  
    Services serviceToDelete = serviceRepository.findById(id).orElse(null);

    if(serviceToDelete == null){
      return false;
    }
    serviceRepository.deleteById(id);
    return true;
  }

  /**
   * Updates a service with the specified ID.
   *
   * @param service The service object with updated information.
   * @return The updated service.
   */
  public Services update(UUID id, Services service) throws RuntimeException {
   
    Services serviceToUpdate = serviceRepository.findById(id).orElse(null);
    if(serviceToUpdate != null){
      service.setId(id);
      Services updatedService = serviceRepository.save(service);
      return updatedService;
    }
    throw new RuntimeException("Service not found");
  }

  /**
   * Retrieves a service by its ID.
   * 
   * @param id The ID of the service to retrieve.
   * @return The service with the specified ID, or null if not found.
   */
  public Optional<Services> findById(UUID id) {
    
    return serviceRepository.findById(id);
  }

  /**
   * Retrieves all services from the database.
   *
   * @return List of all services.
   */
  public List<Services> findAll() {
  
    return serviceRepository.findAll();
  }

  public List<Services> getSomeServices(int quantity) {
    return null;
  }

}
