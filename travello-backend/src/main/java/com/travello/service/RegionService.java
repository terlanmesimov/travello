package com.travello.service;

import com.travello.dto.request.RegionRequestDTO;
import com.travello.dto.response.RegionResponseDTO;

import java.util.List;

public interface RegionService {
    RegionResponseDTO saveRegion(RegionRequestDTO region);
    List<RegionResponseDTO> getRegionList();
    RegionResponseDTO getRegionById(int id);
    boolean deleteRegionById(int id);
    RegionResponseDTO updateRegion(int id ,RegionRequestDTO regionRequestDTO);
}
