package com.cinemax.service.impl;

import com.cinemax.model.Insumo;
import com.cinemax.repository.InsumoRepository;
import com.cinemax.service.InsumoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InsumoServiceImpl implements InsumoService {

    private final InsumoRepository repository;

    @Override
    public List<Insumo> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Insumo> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Insumo save(Insumo entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
