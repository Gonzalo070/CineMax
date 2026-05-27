package com.cinemax.repository;

import com.cinemax.model.Pelicula;
import com.cinemax.model.enums.Genero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PeliculaRepository extends JpaRepository<Pelicula, Long> {

    // Buscar por género (útil para el filtro del frontend)
    List<Pelicula> findByGenero(Genero genero);

    // Buscar por título (ignorando mayúsculas)
    List<Pelicula> findByTituloContainingIgnoreCase(String titulo);
}
