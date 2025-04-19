package com.travello.controller;

import com.travello.dto.response.RegionResponseDTO;

import java.util.List;

public interface RestRegionController {
   RegionResponseDTO getRegionById(Long id);
   List<RegionResponseDTO> getRegionList();
}
