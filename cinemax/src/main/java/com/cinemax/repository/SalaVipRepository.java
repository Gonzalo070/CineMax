package com.cinemax.repository;

import com.cinemax.model.SalaVip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalaVipRepository extends JpaRepository<SalaVip, Long> {
}
