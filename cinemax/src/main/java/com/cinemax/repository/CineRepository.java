package com.cinemax.repository;

import com.cinemax.model.Cine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CineRepository extends JpaRepository<Cine, Long> {

    List<Cine> findByNombreContainingIgnoreCase(String nombre);
}
