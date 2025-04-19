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
@CrossOrigin(origins = "http://localhost:3000")
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
    @GetMapping("/get-by-id/{id}")
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
    public PlaceResponseDTO updatePlace(@PathVariable Long id, @RequestBody PlaceRequestDTO placeRequestDTO) {
        return placeService.updatePlace(id, placeRequestDTO);
    }

    @Override
    @GetMapping("/filter")
    public List<PlaceResponseDTO> getFilteredPlaceList(@RequestParam(name = "region-id", required = false) Long regionId,
                                                       @RequestParam(name = "category-id", required = false) Long categoryId,
                                                       @RequestParam(name = "rating", required = false) Double rating) {
        return placeService.getFilteredPlaceList(regionId, categoryId, rating);
    }

    @Override
    @GetMapping("/search")
    public List<PlaceResponseDTO> searchByName(@RequestParam(name = "place-name") String placeName) {
        return placeService.searchByName(placeName);
    }
}
