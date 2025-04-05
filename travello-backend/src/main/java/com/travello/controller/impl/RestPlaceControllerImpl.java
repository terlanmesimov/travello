package com.travello.controller.impl;

import com.travello.controller.RestPlaceController;
import com.travello.dto.request.PlaceRequestDTO;
import com.travello.dto.response.PlaceResponseDTO;
import com.travello.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/api/place")
public class RestPlaceControllerImpl implements RestPlaceController {
    @Autowired
    private PlaceService placeService;

    @Override
    @PostMapping("/save-place")
    public PlaceResponseDTO savePlace(@RequestBody PlaceRequestDTO placeRequestDTO) {
        return placeService.savePlace(placeRequestDTO);
    }

    @Override
    @GetMapping("/list")
    public List<PlaceResponseDTO> getPlaceList() {
        return placeService.getPlaceList();
    }

    @Override
    @GetMapping("/get/{id}")
    public PlaceResponseDTO getPlaceById(@PathVariable Long id) {
        return placeService.getPlaceById(id);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public boolean deletePlace(@PathVariable Long id) {
        return placeService.deletePlace(id);
    }

    @Override
    @PutMapping("/update/{id}")
    public PlaceResponseDTO updatePlace(@PathVariable Long id,@RequestBody PlaceRequestDTO placeRequestDTO) {
        return placeService.updatePlace(id, placeRequestDTO);
    }
}
