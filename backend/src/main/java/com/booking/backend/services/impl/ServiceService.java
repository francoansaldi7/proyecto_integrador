package com.booking.backend.services.impl;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.NavigableMap;
import java.util.Optional;
import java.util.TreeMap;
import java.util.UUID;
import java.util.stream.Collectors;

import com.booking.backend.services.impl.CharacteristicsService;
import com.booking.backend.services.impl.ServiceImageService;
import com.booking.backend.services.impl.TypeOfServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.booking.backend.datasource.S3DataSource;
import com.booking.backend.models.Characteristic;
import com.booking.backend.models.ServiceImage;
import com.booking.backend.models.Services;
import com.booking.backend.models.TypesOfServices;
import com.booking.backend.repository.IServiceImageRepository;
import com.booking.backend.repository.IServiceReduced;
import com.booking.backend.repository.IServiceRepository;
import com.booking.backend.repository.IServiceRepository.IdAndTituloProjection;
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

    @Autowired
    private S3DataSource s3DataSource;

    @Autowired
    private CharacteristicsService characteristicsService;

    /**
     * Saves the service.
     *
     * @param service The service to be saved.
     * @return The saved service.
     * @throws RuntimeException if the service already exists.
     */
    public Services save(Services service) throws RuntimeException {
        // Check if the service already exists in the repository
        Services serviceExists = serviceRepository.findById(service.getId()).orElse(null);
        
        if (serviceExists != null) {
            throw new RuntimeException("Service already exists");
        }

        // List to store the uploaded service images
        List<ServiceImage> serviceImages = new ArrayList<>();

        // Set the type of service for the service
        List<TypesOfServices> typesOfServices = service.getTypeOfService();

        if (typesOfServices != null) {
            List<TypesOfServices> optionalTypeOfServiceForSave = new ArrayList<>();
            typesOfServices.forEach(typeOfService -> {
                Optional<TypesOfServices> optionalTypeOfService = typeOfServiceService.findById(typeOfService.getId());

                if (optionalTypeOfService.isPresent()) {
                    optionalTypeOfServiceForSave.add(optionalTypeOfService.get());
                } else {
                    // Handle the case when the TypeOfService is not found
                    throw new RuntimeException("TypeOfService not found");
                }
            });
            service.setTypeOfService(optionalTypeOfServiceForSave);
        }

        // Set the characteristics for the service
        if (service.getCharacteristics() != null) {
            List<Characteristic> characteristicsForSave = new ArrayList<>();
            service.getCharacteristics().forEach(characteristic -> {
                Optional<Characteristic> optionalCharacteristic = characteristicsService
                        .findById(characteristic.getId());
                if (optionalCharacteristic.isPresent()) {
                    characteristicsForSave.add(optionalCharacteristic.get());
                } else {
                    // Handle the case when the Characteristic is not found
                    throw new RuntimeException("Characteristic not found");
                }
            });
            service.setCharacteristics(characteristicsForSave);
        }

        // Set the gallery of service images for the service
        service.setGallery(serviceImages);

        // Save the service in the repository and return it
        return serviceRepository.save(service);
    }

    public Services uploadImage(UUID serviceId, String imageFile, boolean isProfile, String fileName)
            throws IOException, RuntimeException {
        // Upload the image file to the S3 data source and get the URL
        String url = s3DataSource.uploadBase64Image(imageFile, fileName);
        System.out.println("URL: " + url);
        Services service = this.findById(serviceId).orElse(null);
        if (service == null) {
            throw new RuntimeException("Service not found");
        }

        synchronized (service) {
            if (isProfile) {
                service.setImgProfileUrl(url);
            } else {
                service.getGallery().add(serviceImageService.save(new ServiceImage(url)));
            }
        }
        return serviceRepository.save(service);

    }

    /**
     * Deletes a service with the given ID.
     *
     * @param id The ID of the service to delete.
     */
    public Boolean deleteById(UUID id) {

        Services serviceToDelete = serviceRepository.findById(id).orElse(null);

        if (serviceToDelete == null) {
            return false;
        }
        System.out.println("Service to delete: " + serviceToDelete);
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
        if (serviceToUpdate != null) {
            serviceToUpdate.setTitle(service.getTitle() == null ? serviceToUpdate.getTitle() : service.getTitle());

            serviceToUpdate.setDescription(
                    service.getDescription() == null ? serviceToUpdate.getDescription() : service.getDescription());
            serviceToUpdate.setPricePerHour(
                    service.getPricePerHour() == 0.0 ? serviceToUpdate.getPricePerHour() : service.getPricePerHour());
            if (service.getCharacteristics() != null) {
                List<Characteristic> characteristicsToUpdate = new ArrayList<>();
                service.getCharacteristics().forEach(characteristic -> {
                    characteristicsService.findById(characteristic.getId()).ifPresent(characteristicsToUpdate::add);
                });
                serviceToUpdate.setCharacteristics(characteristicsToUpdate);
            }
            if (service.getTypeOfService() != null) {
                List<TypesOfServices> typeOfServiceToUpdate = new ArrayList<>();
                service.getTypeOfService().forEach(typeOfService -> {
                    typeOfServiceService.findById(typeOfService.getId()).ifPresent(typeOfServiceToUpdate::add);
                });
                serviceToUpdate.setTypeOfService(typeOfServiceToUpdate);
            }
            // The line code below is provisional, it must be replaced by a method of the service to reserve, i mean ReservationService and be excluded from this class.
            serviceToUpdate.getAvailability().putAll( service.getAvailability() != null ? service.getAvailability() : serviceToUpdate.getAvailability());
            


            Services updatedService = serviceRepository.save(serviceToUpdate);
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

        throw new UnsupportedOperationException("Deprecado. Usar version con parametro pageable");
    }

    public List<Services> getSomeServices(int quantity) {
        return null;
    }

    @Override
    public Page<IServiceReduced> findAll(Pageable pageable) {
        return serviceRepository.findBy(pageable);
    }


    @Override
    public NavigableMap<LocalDate, LocalDate> getUnavailableDates(UUID id) {
        Optional<Services> serviceOptional = serviceRepository.findById(id);

        if (serviceOptional.isPresent()) {
            Services service = serviceOptional.get();
            NavigableMap<LocalDate, LocalDate> availability = new TreeMap<>(service.getAvailability());


            return availability;
        } else {
            throw new RuntimeException("THE SERVICE WITH ID " + id + " does not exist.");
        }
    }

    @Override
    public List<IdAndTituloProjection> findIdAndTitleContaining(String keyword) {
        return serviceRepository.findAllByTitleContaining(keyword);
    }

    @Override
    public Page<IServiceReduced> findAllByTitleContaining(String keyword, Pageable pageable, boolean dateVerification, LocalDate startDate, LocalDate endDate, Long typeOfService) {
        Page<IServiceReduced> serviceReduced;
        if (typeOfService == null) {
            serviceReduced = serviceRepository.findAllByTitleContaining(keyword, pageable);
        } else {
            TypesOfServices typesOfServiceForSave = typeOfServiceService.findById(typeOfService).orElse(null);
            serviceReduced = serviceRepository.findByTitleContainingAndTypeOfService(keyword, typesOfServiceForSave, pageable);
        }

        if (startDate != null && endDate != null && dateVerification) {
            Page<IServiceReduced> newServiceReduced = new PageImpl<>(Collections.emptyList());
            List<IServiceReduced> newServiceReducedList = new ArrayList<>();
            if(serviceReduced.isEmpty()) {
                return newServiceReduced;
            }
            serviceReduced.getContent().forEach(service -> {

                if(this.getAvailability(startDate, endDate, service)) {
                    newServiceReducedList.add(service);
                }
            });
            newServiceReduced = new PageImpl<>(newServiceReducedList, pageable, serviceReduced.getTotalElements());
            return newServiceReduced;
        }
        return serviceReduced;
    }

        public Page<IServiceReduced> findAllByTitleContainingAndTypeOfService(String keyword, TypesOfServices typeOfService, Pageable pageable) {
        return serviceRepository.findByTitleContainingAndTypeOfService(keyword, typeOfService, pageable);
    }

    public Boolean getAvailability(LocalDate startDate, LocalDate endDate, IServiceReduced service) {
        System.out.println(service.getAvailability());
        NavigableMap<LocalDate, LocalDate> availability = new TreeMap<>(service.getAvailability());
     
        
       if(service.getAvailability().containsKey(startDate)) {
           return false; // The start date coincides with another reservation
       }

       Map.Entry<LocalDate, LocalDate> lowerEntry = availability.lowerEntry(startDate);
       if (lowerEntry != null && lowerEntry.getValue().isAfter(startDate)) {
           return false; // The start date is within another reservation
       }
       
        Map.Entry<LocalDate, LocalDate> higherEntry = availability.higherEntry(startDate);
        if (higherEntry != null && !endDate.isBefore(higherEntry.getKey())) {
            return false; // The end date is within another reservation
        }
       return true;
    
        
    }

}
