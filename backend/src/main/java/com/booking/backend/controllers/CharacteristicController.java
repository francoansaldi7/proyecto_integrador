package com.booking.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.backend.models.Characteristic;
import com.booking.backend.services.impl.CharacteristicsService;

@RestController
@RequestMapping("/api/v1/characteristic")
public class CharacteristicController {
  @Autowired
  private CharacteristicsService characteristicsService;

  @GetMapping
  public Iterable<Characteristic> getCharacteristics() {
    return characteristicsService.findAll();
  }

  @GetMapping("/{id}")
  public Characteristic getCharacteristic(@PathVariable Long id) {
    return characteristicsService.findById(id).orElseThrow(() -> new RuntimeException("Characteristic not found"));
  }

  @PostMapping
  public Characteristic save(@RequestBody Characteristic characteristic) {
    return characteristicsService.save(characteristic);
  }

  @PutMapping("/{id}")
  public Characteristic update(@PathVariable Long id ,@RequestBody Characteristic characteristic) {
    return characteristicsService.update(id, characteristic);
  }

  @DeleteMapping("/{id}")
  public Boolean delete(@PathVariable Long id) {
    return characteristicsService.deleteById(id);
  }
}