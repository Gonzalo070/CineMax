package com.cinemax.service.impl;

import com.cinemax.model.Proveedor;
import com.cinemax.repository.ProveedorRepository;
import com.cinemax.service.ProveedorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProveedorServiceImpl implements ProveedorService {

    private final ProveedorRepository repository;

    @Override
    public List<Proveedor> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Proveedor> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Proveedor save(Proveedor entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
