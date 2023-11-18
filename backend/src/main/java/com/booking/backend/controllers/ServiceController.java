package com.booking.backend.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.booking.backend.models.Services;
import com.booking.backend.repository.IServiceReduced;
import com.booking.backend.repository.IServiceRepository.IdAndTituloProjection;
import com.booking.backend.services.impl.ServiceService;
import com.booking.backend.services.impl.UserDetailsServiceImpl;
import com.booking.backend.services.impl.VerifyRoleService;

@RestController
@RequestMapping("/api/v1/services")
public class ServiceController {
    @Autowired
    private ServiceService serviceService;

  @Autowired
  private UserDetailsServiceImpl userDetailsService; 

  @Autowired
  private VerifyRoleService verifyRoleService;
  


    /**
     * Retrieves all services.
     *
     * @return List of services.
     */
    @GetMapping
    public Page<IServiceReduced> findAll(@RequestParam(defaultValue = "1", required = false) int page,
                                  @RequestParam(defaultValue = "1", required = false) int size) {
        Pageable pageRequest  = PageRequest.of(page, size);
        return serviceService.findAll(pageRequest);
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('ADMIN')")
    @CrossOrigin(value = {"${cors.allowedOrigins}"})
    public Page<IServiceReduced> findAllAdmin(@RequestParam(defaultValue = "1", required = false) int page,
                                  @RequestParam(defaultValue = "1", required = false) int size) {
                                    Pageable pageRequest  = PageRequest.of(page, size);
        return serviceService.findAll(pageRequest);
    }

    @GetMapping("/{id}")
    public Optional<Services> findById(@PathVariable UUID id) {
        return serviceService.findById(id);
    }


    @GetMapping("/search")
    public List<IdAndTituloProjection> search(@RequestParam String query) {
        return serviceService.findIdAndTitleContaining(query);
    }

        @GetMapping("/search-all")
    public Page<IServiceReduced> searchAll(@RequestParam String query, @RequestParam(defaultValue = "1", required = false) int page,
                                  @RequestParam(defaultValue = "1", required = false) int size) {
        Pageable pageRequest  = PageRequest.of(page, size);
        return serviceService.findAllByTitleContaining(query, pageRequest);
    }

  /**
   * Creates a new service.
   *
   * @param service The service to be created.
   * @return The created service.
   * @throws Exception
   */


  @PostMapping
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<?> createService(@RequestBody Services service) throws Exception {

    return ResponseEntity.ok().body(serviceService.save(service));
  }

   @PostMapping("/{serviceId}/images")
  public ResponseEntity<?> createServiceImages(@PathVariable UUID serviceId,@RequestBody Map<String, String> imageData) throws Exception {

    String base64Image = imageData.get("base64Image");
        String fileName = imageData.get("fileName");
    return ResponseEntity.ok().body(serviceService.uploadImage(serviceId, base64Image, false, fileName));
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
