package com.cinemax.service;

import com.cinemax.model.Pelicula;
import com.cinemax.model.enums.Genero;
import java.util.List;
import java.util.Optional;

public interface PeliculaService {

    List<Pelicula> findAll();

    Optional<Pelicula> findById(Long id);

    List<Pelicula> findByGenero(Genero genero);

    List<Pelicula> findByTitulo(String titulo);

    Pelicula save(Pelicula pelicula);

    Pelicula update(Long id, Pelicula pelicula);

    void deleteById(Long id);
}
