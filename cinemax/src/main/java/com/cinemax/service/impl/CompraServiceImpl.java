package com.cinemax.service.impl;

import com.cinemax.model.Compra;
import com.cinemax.repository.CompraRepository;
import com.cinemax.service.CompraService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompraServiceImpl implements CompraService {

    private final CompraRepository repository;

    @Override
    public List<Compra> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Compra> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Compra save(Compra entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
