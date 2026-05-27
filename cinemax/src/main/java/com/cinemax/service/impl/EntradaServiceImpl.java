package com.cinemax.service.impl;

import com.cinemax.model.Entrada;
import com.cinemax.repository.EntradaRepository;
import com.cinemax.service.EntradaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EntradaServiceImpl implements EntradaService {

    private final EntradaRepository repository;

    @Override
    public List<Entrada> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Entrada> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Entrada save(Entrada entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
