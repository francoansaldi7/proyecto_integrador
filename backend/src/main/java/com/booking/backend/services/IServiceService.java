package com.booking.backend.services;

import com.booking.backend.models.Services;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IServiceService extends IBaseCrudService<Services, Services> {
    Page<Services> findAll(Pageable pageable);
}
