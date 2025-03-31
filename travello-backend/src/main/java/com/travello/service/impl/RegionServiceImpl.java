package com.travello.service.impl;

import com.travello.dto.request.RegionRequestDTO;
import com.travello.dto.response.RegionResponseDTO;
import com.travello.entity.Region;
import com.travello.repository.RegionRepository;
import com.travello.service.RegionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RegionServiceImpl implements RegionService {

    @Autowired
    private RegionRepository regionRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public RegionResponseDTO saveRegion(RegionRequestDTO regionRequestDTO) {
        Region region = modelMapper.map(regionRequestDTO, Region.class);
        RegionResponseDTO regionResponseDTO = modelMapper.map(regionRepository.save(region), RegionResponseDTO.class);
        return regionResponseDTO;
    }

    @Override
    public List<RegionResponseDTO> getRegionList() {
        List<Region> regionList = regionRepository.findAll();
        List<RegionResponseDTO> regionResponseDTOList = new ArrayList<>();
        for (Region region : regionList) {
            RegionResponseDTO regionResponseDTO = modelMapper.map(region, RegionResponseDTO.class);
            regionResponseDTOList.add(regionResponseDTO);
        }
        return regionResponseDTOList;
    }

    @Override
    public RegionResponseDTO getRegionById(int id) {
        Optional<Region> optional = regionRepository.findById(id);
        Region region = optional.orElse(null);
        RegionResponseDTO regionResponseDTO = modelMapper.map(region, RegionResponseDTO.class);
        return regionResponseDTO;
    }

    @Override
    public boolean deleteRegionById(int id) {
        regionRepository.deleteById(id);
        return !regionRepository.existsById(id);
    }

    @Override
    public RegionResponseDTO updateRegion(int id, RegionRequestDTO regionRequestDTO) {
        return null;
    }

}


