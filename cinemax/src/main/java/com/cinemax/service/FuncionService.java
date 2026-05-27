package com.cinemax.service;

import com.cinemax.model.Funcion;
import java.util.List;
import java.util.Optional;

public interface FuncionService {
    List<Funcion> findAll();
    Optional<Funcion> findById(Long id);
    Funcion save(Funcion entity);
    void deleteById(Long id);
}
