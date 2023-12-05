package com.booking.backend.models;

import java.time.LocalDate;
import java.util.UUID;

import com.booking.backend.repository.IServiceReduced;


public interface IReviewReduced {
  UUID getId();

  IUserReduced getUser();

  String getComment();

  float getRating();

  String getCommentTitle();

  LocalDate getDate();
}
