package com.cinemax.repository;

import com.cinemax.model.ClienteVip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteVipRepository extends JpaRepository<ClienteVip, Long> {
}
