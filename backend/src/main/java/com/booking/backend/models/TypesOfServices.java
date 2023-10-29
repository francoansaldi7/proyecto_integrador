package com.booking.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypesOfServices {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  
} 
// TypesOfServices {
// ANIMATION_STUDY, FILMING_STUDY, PHOTOGRAPHER, VIDEOGRAPHER, EDITOR, MODELED, ILLUSTRATOR, DESIGNER
// }
