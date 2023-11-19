package com.booking.backend.repository;

import java.util.List;
import java.util.UUID;

import com.booking.backend.models.TypesOfServices;

public interface IServiceReduced {
      UUID getId();
      String getTitle();
      String getDescription();
      float getPricePerHour();
      String getImgProfileUrl();
      List<TypesOfServices> getTypeOfService();
      float getRating();
    
}
