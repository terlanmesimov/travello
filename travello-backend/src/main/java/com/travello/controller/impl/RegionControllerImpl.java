package com.travello.controller.impl;

import com.travello.controller.RegionController;
import com.travello.dto.request.RegionRequestDTO;
import com.travello.dto.response.RegionResponseDTO;
import com.travello.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/region")
public class RegionControllerImpl implements RegionController {

    @Autowired
    private RegionService regionService;

    @Override
    @PostMapping("/save-region")
    public RegionResponseDTO saveRegion(@RequestBody RegionRequestDTO regionRequestDTO) {
        return regionService.saveRegion(regionRequestDTO);
    }

    @Override
    @GetMapping("/region-list")
    public List<RegionResponseDTO> getRegionList() {
        return regionService.getRegionList();
    }

    @Override
    @GetMapping("/{id}")
    public RegionResponseDTO getRegionById(@PathVariable(name = "id") int id) {
        return regionService.getRegionById(id);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public boolean deleteRegionById(@PathVariable(name = "id") int id) {
        return regionService.deleteRegionById(id);
    }

    @Override
    @PutMapping("/update/{id}")
    public RegionResponseDTO updateRegion(@PathVariable(name = "id") int id,@RequestBody RegionRequestDTO regionRequestDTO) {
        return regionService.updateRegion(id, regionRequestDTO);
    }


}
