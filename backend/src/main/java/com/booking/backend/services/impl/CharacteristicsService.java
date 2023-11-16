package com.booking.backend.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.backend.models.Characteristic;
import com.booking.backend.repository.ICharacteristicsRepository;

@Service
public class CharacteristicsService {
  @Autowired
  private ICharacteristicsRepository characteristicsRepository;

  public Characteristic save(Characteristic characteristic) {
    return characteristicsRepository.save(characteristic);
  }

  public Optional<Characteristic> findById(Long id) {
    return characteristicsRepository.findById(id);
  }

  public Iterable<Characteristic> findAll() {
    return characteristicsRepository.findAll();
  }

  public Characteristic update(Long id, Characteristic characteristic) {
    return characteristicsRepository.save(characteristic);
  }

  public Boolean deleteById(Long id) {
    try {
      characteristicsRepository.deleteById(id);
      return true;
    } catch (Exception e) {
      return false;
    }
  }
}
