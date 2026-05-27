package com.cinemax.service.impl;

import com.cinemax.model.Venta;
import com.cinemax.repository.VentaRepository;
import com.cinemax.service.VentaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VentaServiceImpl implements VentaService {

    private final VentaRepository repository;

    @Override
    public List<Venta> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Venta> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Venta save(Venta entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
