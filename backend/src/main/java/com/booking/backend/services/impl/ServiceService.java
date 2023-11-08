package com.booking.backend.services.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.booking.backend.datasource.S3DataSource;
import com.booking.backend.models.ServiceImage;
import com.booking.backend.models.Services;
import com.booking.backend.models.TypesOfServices;
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

    @Autowired
    private S3DataSource s3DataSource;

    /**
     * Saves the service.
     *
     * @param service    The service to be saved.
     * @param imageFiles The array of image files to be uploaded.
     * @return The saved service.
     * @throws RuntimeException if the service already exists.
     * @throws IOException      if there is an error uploading the image files.
     */
    public Services save(Services service) throws RuntimeException {
        // Check if the service already exists in the repository
        Services serviceExists = serviceRepository.findById(service.getId()).orElse(null);
        if (serviceExists != null) {
            throw new RuntimeException("Service already exists");
        }

        // List to store the uploaded service images
        List<ServiceImage> serviceImages = new ArrayList<>();

        // // Convert the array of image files to a list
        // List<MultipartFile> imageFilesList = Arrays.asList(imageFiles);

        // // Iterate over each image file
        // imageFilesList.forEach(img -> {
        //     try {
        //         // Upload the image file to the S3 data source and get the URL
        //         String url = s3DataSource.uploadFile(img);

        //         // Create a new service image with the URL and save it
        //         ServiceImage savedServiceImage = serviceImageService.save(new ServiceImage(url));

        //         // Add the saved service image to the list
        //         serviceImages.add(savedServiceImage);
        //     } catch (IOException e) {
        //         e.printStackTrace();
        //     }
        // });

        // Set the type of service for the service
        Optional<TypesOfServices> optionalTypeOfService = typeOfServiceService.findById(service.getTypeOfService().getId());
        if (optionalTypeOfService.isPresent()) {
            service.setTypeOfService(optionalTypeOfService.get());
        } else {
            // Handle the case when the TypeOfService is not found
            throw new RuntimeException("TypeOfService not found");
        }

        // Set the gallery of service images for the service
        service.setGallery(serviceImages);

        // Save the service in the repository and return it
        return serviceRepository.save(service);
    }

    public Services uploadImage(UUID serviceId, String imageFile, boolean isProfile, String fileName) throws IOException, RuntimeException {
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

        throw new UnsupportedOperationException("Deprecado. Usar version con parametro pageable");
    }

    public List<Services> getSomeServices(int quantity) {
        return null;
    }


    @Override
    public Page<Services> findAll(Pageable pageable) {
        return serviceRepository.findAll(pageable);
    }
}
