package com.cinemax.service.impl;

import com.cinemax.model.Sala;
import com.cinemax.repository.SalaRepository;
import com.cinemax.service.SalaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SalaServiceImpl implements SalaService {

    private final SalaRepository repository;

    @Override
    public List<Sala> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Sala> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Sala save(Sala entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
