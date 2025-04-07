package com.travello.repository;

import com.travello.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region,Long> {
    Long findByName(String name);
}
