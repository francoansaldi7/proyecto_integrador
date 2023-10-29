package com.booking.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.backend.models.TypesOfServices;
import com.booking.backend.repository.ITypeOfServiceRepository;

public interface ITypeOfServiceService extends IBaseCrudService<TypesOfServices, TypesOfServices> {

  
}
