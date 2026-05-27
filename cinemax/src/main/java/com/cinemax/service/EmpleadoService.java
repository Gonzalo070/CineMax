package com.cinemax.service;

import com.cinemax.model.Empleado;
import java.util.List;
import java.util.Optional;

public interface EmpleadoService {
    List<Empleado> findAll();
    Optional<Empleado> findById(Long id);
    Empleado save(Empleado entity);
    void deleteById(Long id);
}
