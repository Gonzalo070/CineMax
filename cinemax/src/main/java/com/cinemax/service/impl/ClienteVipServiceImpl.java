package com.cinemax.service.impl;

import com.cinemax.model.ClienteVip;
import com.cinemax.repository.ClienteVipRepository;
import com.cinemax.service.ClienteVipService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClienteVipServiceImpl implements ClienteVipService {

    private final ClienteVipRepository repository;

    @Override
    public List<ClienteVip> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<ClienteVip> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public ClienteVip save(ClienteVip entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
