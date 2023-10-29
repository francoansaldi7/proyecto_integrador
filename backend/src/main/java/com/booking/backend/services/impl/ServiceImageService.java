package com.booking.backend.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.backend.models.ServiceImage;
import com.booking.backend.repository.IServiceImageRepository;
import com.booking.backend.services.IServiceImageService;

import jakarta.validation.Valid;

@Service
public class ServiceImageService implements IServiceImageService {
  @Autowired
  private IServiceImageRepository serviceImageRepository;

  @Override
  public ServiceImage save(ServiceImage serviceImage) {
    return serviceImageRepository.save(serviceImage);
  }

  @Override
  public List<com.booking.backend.models.ServiceImage> findAll() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'findAll'");
  }

  @Override
  public Optional<com.booking.backend.models.ServiceImage> findById(UUID id) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'findById'");
  }

  @Override
  public Boolean deleteById(UUID id) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'deleteById'");
  }

  @Override
  public com.booking.backend.models.ServiceImage update(UUID id, com.booking.backend.models.@Valid ServiceImage t)
      throws RuntimeException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'update'");
  }
}
