package com.booking.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import com.booking.backend.models.Characteristic;
import com.booking.backend.services.impl.CharacteristicsService;

@CrossOrigin(origins = "${cors.allowedOrigins}")
@RestController
@RequestMapping("/api/v1/characteristic")
public class CharacteristicController {
  @Autowired
  private CharacteristicsService characteristicsService;

    @Value("${cors.allowedOrigins}")
    private String allowedOrigins;

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