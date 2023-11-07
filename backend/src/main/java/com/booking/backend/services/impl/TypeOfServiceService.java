package com.booking.backend.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.backend.models.TypesOfServices;
import com.booking.backend.repository.ITypeOfServiceRepository;
import com.booking.backend.services.ITypeOfServiceService;

import jakarta.validation.Valid;

@Service
public class TypeOfServiceService implements ITypeOfServiceService {
    @Autowired
    private ITypeOfServiceRepository typeOfServiceRepository;

    @Override
    public TypesOfServices save(@Valid TypesOfServices typesOfService) {
        return typeOfServiceRepository.save(typesOfService);
    }

    @Override
    public List<TypesOfServices> findAll() {
        return typeOfServiceRepository.findAll();
    }


    public Optional<TypesOfServices> findById(Long id) {
        return typeOfServiceRepository.findById(id);
    }

    @Override
    public Boolean deleteById(UUID id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteById'");
    }

    @Override
    public TypesOfServices update(UUID id, @Valid TypesOfServices t) throws RuntimeException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public Optional<TypesOfServices> findById(UUID id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }
}
