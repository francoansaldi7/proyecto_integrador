package com.booking.backend.services;



import com.booking.backend.models.Services;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface IServiceService extends IBaseCrudService<Services, Services> {
    Page<Services> findAll(Pageable pageable);

   List<LocalDate> obtenerFechasDisponibles(UUID id);
}
