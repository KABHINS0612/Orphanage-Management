package com.oms.backend.services;

import com.oms.backend.entities.Orphan;
import com.oms.backend.repositories.OrphanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrphanService {

    private final OrphanRepository orphanRepository;

    public List<Orphan> getAllOrphans() {
        return orphanRepository.findAll();
    }

    public Orphan getOrphanById(String id) {
        return orphanRepository.findById(id).orElseThrow(() -> new RuntimeException("Orphan not found"));
    }

    public Orphan saveOrphan(Orphan orphan) {
        return orphanRepository.save(orphan);
    }

    public void deleteOrphan(String id) {
        orphanRepository.deleteById(id);
    }
}
