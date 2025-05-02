package com.travello.controller.impl;

import com.travello.controller.RestPlaceController;
import com.travello.dto.request.CommentRequestDTO;
import com.travello.dto.request.PlaceRequestDTO;
import com.travello.dto.response.CommentResponseDTO;
import com.travello.dto.response.PlaceResponseDTO;
import com.travello.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rest/api/place")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
public class RestPlaceControllerImpl implements RestPlaceController {

    private final PlaceService placeService;

    @Override
    @PostMapping( value = "/save" ,consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PlaceResponseDTO> savePlace(@ModelAttribute PlaceRequestDTO placeRequestDTO) {
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
    @PutMapping(value="/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PlaceResponseDTO> updatePlace(@PathVariable Long id,
                                                        @ModelAttribute PlaceRequestDTO placeRequestDTO) {
        return placeService.updatePlace(id, placeRequestDTO);
    }

    @Override
    @GetMapping("/filter")
    public ResponseEntity<List<PlaceResponseDTO>> getFilteredPlaceList(
            @RequestParam(name = "region-id", required = false) Long regionId,
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

    @Override
    @GetMapping("/fav-list")
    public ResponseEntity<?> getFavorites(@RequestHeader String token) {
        return placeService.getFavorites(token);
    }

    @Override
    @PostMapping("/add-comment")
    public ResponseEntity<?> addComment(@RequestHeader String token,
                                        @RequestBody CommentRequestDTO commentRequestDTO) {
        return placeService.addComment(token, commentRequestDTO);
    }

    @Override
    @PutMapping("/edit-comment/{id}")
    public ResponseEntity<?> editComment(@RequestHeader String token,
                                         @PathVariable Long id,
                                         @RequestBody CommentRequestDTO commentRequestDTO) {
        return placeService.editComment(token, id, commentRequestDTO);
    }

    @Override
    @DeleteMapping("delete-comment/{id}")
    public ResponseEntity<Boolean> deleteComment(@RequestHeader String token, @PathVariable Long id) {
        return placeService.deleteComment(token, id);
    }

}
