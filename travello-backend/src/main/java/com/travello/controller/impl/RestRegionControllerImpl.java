package com.travello.controller.impl;

import com.travello.controller.RestRegionController;
import com.travello.dto.response.RegionResponseDTO;
import com.travello.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/api/region")
@CrossOrigin(origins = "http://localhost:3000")
public class RestRegionControllerImpl implements RestRegionController {
    @Autowired
    private RegionService regionService;

    @Override
    @GetMapping("/get-by-id/{id}")
    public RegionResponseDTO getRegionById(@PathVariable Long id) {
        return regionService.getRegionById(id);
    }

    @Override
    @GetMapping("/list")
    public List<RegionResponseDTO> getRegionList() {
        return regionService.getRegionList();
    }
}
