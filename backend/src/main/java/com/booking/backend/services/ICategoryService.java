package com.booking.backend.services;

import java.util.List;
import java.util.Optional;

import com.booking.backend.models.TypesOfServices;

import jakarta.validation.Valid;

public interface ICategoryService {
  
  TypesOfServices save(@Valid TypesOfServices category, String imageFile, String fileName);

  List<TypesOfServices> findAll();

  Optional<TypesOfServices> findById(Long id);

  TypesOfServices update(Long id, @Valid TypesOfServices t);
  
  Boolean deleteById(Long id);

}
