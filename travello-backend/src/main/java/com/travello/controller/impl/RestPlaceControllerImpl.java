package com.travello.controller.impl;

import com.travello.controller.RestPlaceController;
import com.travello.dto.request.PlaceRequestDTO;
import com.travello.dto.response.PlaceResponseDTO;
import com.travello.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rest/api/place")
@CrossOrigin(origins = "http://localhost:3000")
public class RestPlaceControllerImpl implements RestPlaceController {

    private final PlaceService placeService;

    @Override
    @PostMapping("/save-place")
    public ResponseEntity<PlaceResponseDTO> savePlace(@RequestBody PlaceRequestDTO placeRequestDTO) {
        return placeService.savePlace(placeRequestDTO);
    }

    @Override
    @GetMapping("/list")
    public ResponseEntity<List<PlaceResponseDTO>> getPlaceList() {
        return placeService.getPlaceList();
    }

    @Override
    @GetMapping("/get/{id}")
    public ResponseEntity<PlaceResponseDTO> getPlaceById(@PathVariable Long id) {
        return placeService.getPlaceById(id);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deletePlace(@PathVariable Long id) {
        return placeService.deletePlace(id);
    }

    @Override
    @PutMapping("/update/{id}")
    public ResponseEntity<PlaceResponseDTO> updatePlace(@PathVariable Long id, @RequestBody PlaceRequestDTO placeRequestDTO) {
        return placeService.updatePlace(id, placeRequestDTO);
    }

    @Override
    @GetMapping("/filter")
    public ResponseEntity<List<PlaceResponseDTO>> getFilteredPlaceList(@RequestParam(name = "region-id", required = false) Long regionId,
                                                                       @RequestParam(name = "category-id", required = false) Long categoryId,
                                                                       @RequestParam(name = "rating", required = false) Double rating) {
        return placeService.getFilteredPlaceList(regionId, categoryId, rating);
    }

    @Override
    @GetMapping("/search")
    public ResponseEntity<List<PlaceResponseDTO>> searchByName(@RequestParam(name = "place-name") String placeName) {
        return placeService.searchByName(placeName);
    }

    @Override
    @PostMapping("/add-fav/{id}")
    public ResponseEntity<Boolean> addFavorites(@RequestHeader String token, @PathVariable Long id) {
        return placeService.addFavorites(token, id);
    }

    @Override
    @DeleteMapping("/delete-fav/{id}")
    public ResponseEntity<Boolean> deleteFavorites(@RequestHeader String token, @PathVariable Long id) {
        return placeService.deleteFavorites(token, id);
    }
}
