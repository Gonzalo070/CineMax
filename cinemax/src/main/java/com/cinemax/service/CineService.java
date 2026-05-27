package com.cinemax.service;

import com.cinemax.model.Cine;
import java.util.List;
import java.util.Optional;

public interface CineService {

    List<Cine> findAll();

    Optional<Cine> findById(Long id);

    List<Cine> findByNombre(String nombre);

    Cine save(Cine cine);

    Cine update(Long id, Cine cine);

    void deleteById(Long id);
}
