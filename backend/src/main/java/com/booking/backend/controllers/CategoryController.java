package com.booking.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.booking.backend.models.TypesOfServices;
import com.booking.backend.services.impl.CategoryService;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {
  @Autowired
  private CategoryService categoryService;


  @GetMapping
  public Iterable<TypesOfServices> findAll() {
    return categoryService.findAll();
  }

  @GetMapping("/{id}")
  public TypesOfServices findById(@PathVariable Long id) {
    return categoryService.findById(id).get();
  }

  @PostMapping
  public TypesOfServices save(@RequestBody TypesOfServicesExtended category) {
    return categoryService.save(category.category(), category.imageFile(), category.fileName());
  }

  public record TypesOfServicesExtended(TypesOfServices category, String imageFile, String fileName) {
    
  }

  @PutMapping("/{id}")
  public TypesOfServices update(@PathVariable Long id, @RequestBody TypesOfServices category) {
    return categoryService.update(id, category);
  }

  @DeleteMapping("/{id}")
  public Boolean deleteById(@PathVariable Long id) {
    return categoryService.deleteById(id);
  }
}
