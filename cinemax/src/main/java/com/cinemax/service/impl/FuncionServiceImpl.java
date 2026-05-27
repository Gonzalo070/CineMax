package com.cinemax.service.impl;

import com.cinemax.model.Funcion;
import com.cinemax.repository.FuncionRepository;
import com.cinemax.service.FuncionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FuncionServiceImpl implements FuncionService {

    private final FuncionRepository repository;

    @Override
    public List<Funcion> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Funcion> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Funcion save(Funcion entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
