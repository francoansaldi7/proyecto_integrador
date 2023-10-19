package com.booking.backend.controllers;

import java.util.UUID;

import org.springframework.web.bind.annotation.RestController;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@RestController
public class UserController {
  private UUID id;

}
