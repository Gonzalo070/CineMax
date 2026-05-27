package com.cinemax.service.impl;

import com.cinemax.model.SalaVip;
import com.cinemax.repository.SalaVipRepository;
import com.cinemax.service.SalaVipService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SalaVipServiceImpl implements SalaVipService {

    private final SalaVipRepository repository;

    @Override
    public List<SalaVip> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<SalaVip> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public SalaVip save(SalaVip entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
