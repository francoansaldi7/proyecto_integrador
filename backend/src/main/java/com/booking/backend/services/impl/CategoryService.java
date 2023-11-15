package com.booking.backend.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.backend.datasource.S3DataSource;
import com.booking.backend.models.TypesOfServices;
import com.booking.backend.repository.ITypeOfServiceRepository;
import com.booking.backend.services.ICategoryService;

import jakarta.validation.Valid;


@Service
public class CategoryService implements ICategoryService {

  @Autowired
  private ITypeOfServiceRepository typeOfServiceRepository;

  @Autowired
  private S3DataSource s3DataSource;

  @Override
  public TypesOfServices save(TypesOfServices category, String imageFile, String fileName) {
    try {
      category.setImgProfileUrl(s3DataSource.uploadBase64Image(imageFile, fileName));
    } catch (Exception e) {
      throw new RuntimeException("Error uploading image: " + e.getMessage());
    }
    return typeOfServiceRepository.save(category);
  }


  @Override
  public List<TypesOfServices> findAll() {
    return typeOfServiceRepository.findAll();
  }

  
  public Optional<TypesOfServices> findById(Long id) {
    return typeOfServiceRepository.findById(id);
  }

  @Override
  public TypesOfServices update(Long id, @Valid TypesOfServices t) {
    TypesOfServices categoryToUpdate = typeOfServiceRepository.findById(id).orElse(null);
    if (categoryToUpdate != null) {
      categoryToUpdate.setName(t.getName() == null ? categoryToUpdate.getName() : t.getName());
      categoryToUpdate.setDescription(t.getDescription() == null ? categoryToUpdate.getDescription() : t.getDescription());
      categoryToUpdate.setImgProfileUrl(t.getImgProfileUrl() == null ? categoryToUpdate.getImgProfileUrl() : t.getImgProfileUrl());
      return typeOfServiceRepository.save(categoryToUpdate);
    }
    throw new RuntimeException("Category not found");
  }

  @Override
  public Boolean deleteById(Long id) {
    try {
      typeOfServiceRepository.deleteById(id);
      return  true;
    } catch (Exception e) {
      return false;
    }
  }


  
}
