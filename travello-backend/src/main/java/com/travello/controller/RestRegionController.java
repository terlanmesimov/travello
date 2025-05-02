package com.travello.controller;

import com.travello.dto.response.RegionResponseDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RestRegionController {
   ResponseEntity<RegionResponseDTO> getRegionById(Long id);
   ResponseEntity<List<RegionResponseDTO>> getRegionList();
}
