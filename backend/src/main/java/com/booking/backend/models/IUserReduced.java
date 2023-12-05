package com.booking.backend.models;

import java.util.UUID;

public interface IUserReduced {
 UUID getId();
  String getName();

  String getUsername();

  String getEmail();

  String getPhoneNumber();
  String getImgProfileUrl();
}
