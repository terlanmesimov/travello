package com.travello.service;

import com.travello.dto.response.RegionResponseDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RegionService {
    ResponseEntity<List<RegionResponseDTO>> getRegionList();
    ResponseEntity<RegionResponseDTO> getRegionById(Long id);
}
