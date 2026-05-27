package com.cinemax.service;

import com.cinemax.model.Sala;
import java.util.List;
import java.util.Optional;

public interface SalaService {
    List<Sala> findAll();
    Optional<Sala> findById(Long id);
    Sala save(Sala entity);
    void deleteById(Long id);
}
