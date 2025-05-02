package com.travello.controller.impl;

import com.travello.controller.RestRegionController;
import com.travello.dto.response.RegionResponseDTO;
import com.travello.service.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rest/api/region")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
public class RestRegionControllerImpl implements RestRegionController {

    private final RegionService regionService;

    @Override
    @GetMapping("/get/{id}")
    public ResponseEntity<RegionResponseDTO> getRegionById(@PathVariable Long id) {
        return regionService.getRegionById(id);
    }

    @Override
    @GetMapping("/list")
    public ResponseEntity<List<RegionResponseDTO>> getRegionList() {
        return regionService.getRegionList();
    }
}
