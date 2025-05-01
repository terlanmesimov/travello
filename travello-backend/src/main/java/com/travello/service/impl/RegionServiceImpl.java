package com.travello.service.impl;

import com.travello.dto.response.RegionResponseDTO;
import com.travello.entity.Region;
import com.travello.repository.RegionRepository;
import com.travello.service.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RegionServiceImpl implements RegionService {

    private final RegionRepository regionRepository;

    @Override
    public ResponseEntity<List<RegionResponseDTO>> getRegionList() {
        List<RegionResponseDTO> response = new ArrayList<>();
        List<Region> regionList = regionRepository.findAll();
        regionList.forEach(region -> {
            List<Long> placeIds = new ArrayList<>();
            region.getPlaces().forEach(place -> placeIds.add(place.getId()));
            response.add(new RegionResponseDTO(region.getId(), region.getName(), placeIds));
        });
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<RegionResponseDTO> getRegionById(Long id) {
        Region region = regionRepository.findById(id).orElseThrow();
        List<Long> placeIds = new ArrayList<>();
        region.getPlaces().forEach(place -> placeIds.add(place.getId()));
        RegionResponseDTO response = new RegionResponseDTO(region.getId(), region.getName(), placeIds);
        return ResponseEntity.ok(response);
    }
}
