package com.travello.service;

import com.travello.dto.response.RegionResponseDTO;

import java.util.List;

public interface RegionService {
    List<RegionResponseDTO> getRegionList();
    RegionResponseDTO getRegionById(Long id);
}
