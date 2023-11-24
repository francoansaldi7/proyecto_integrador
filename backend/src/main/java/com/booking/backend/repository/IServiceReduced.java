package com.booking.backend.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.NavigableMap;
import java.util.UUID;

import com.booking.backend.models.TypesOfServices;
import com.booking.backend.models.User;

public interface IServiceReduced {
      UUID getId();
      String getTitle();
      String getDescription();
      float getPricePerHour();
      String getImgProfileUrl();
      Map<LocalDate, LocalDate> getAvailability();
      List<TypesOfServices> getTypeOfService();
      float getRating();
    
}
