package com.booking.backend.services;



import com.booking.backend.models.Services;
import com.booking.backend.models.TypesOfServices;
import com.booking.backend.repository.IServiceReduced;
import com.booking.backend.repository.IServiceRepository.IdAndTituloProjection;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.NavigableMap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface IServiceService extends IBaseCrudService<Services, Services> {

   NavigableMap<LocalDate, LocalDate> getUnavailableDates(UUID id);
    Page<IServiceReduced> findAll(Pageable pageable);

    List<IdAndTituloProjection> findIdAndTitleContaining(String keyword);

    public Page<IServiceReduced> findAllByTitleContaining(String keyword, Pageable pageable, boolean dateVerification, LocalDate startDate, LocalDate endDate, Long typeOfService);
}
