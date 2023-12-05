package com.booking.backend.views;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.booking.backend.models.Characteristic;
import com.booking.backend.models.IReviewReduced;
import com.booking.backend.models.ServiceImage;
import com.booking.backend.models.TypesOfServices;
import com.booking.backend.repository.IServiceReduced;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public final class Views {


  public interface  ServiceReduced extends IServiceReduced {

  



    List<Characteristic> getCharacteristics();

    List<ServiceImage> getGallery();

    List<IReviewReduced> getReviews();



  }


  public static class ReviewReduced {
    private UUID id;
    private String comment;
    private String commentTitle;
    private float rating;
    private LocalDate date;

    //private UserReduced user;

  }

  @Getter
  @Setter
    @AllArgsConstructor
  @NoArgsConstructor
  public static class UserReduced {
    private UUID id;
    private String name;

    private String username;

    private String email;

    private String phoneNumber;
    private String imgProfileUrl;
  }
}
