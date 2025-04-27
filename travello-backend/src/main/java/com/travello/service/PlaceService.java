package com.travello.service;

import com.travello.dto.request.PlaceRequestDTO;
import com.travello.dto.response.PlaceResponseDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PlaceService {
    ResponseEntity<PlaceResponseDTO> savePlace(PlaceRequestDTO placeRequestDTO);
    ResponseEntity<List<PlaceResponseDTO>> getPlaceList();
    ResponseEntity<PlaceResponseDTO> getPlaceById(Long id);
    ResponseEntity<Boolean> deletePlace(Long id);
    ResponseEntity<PlaceResponseDTO> updatePlace(Long id, PlaceRequestDTO placeRequestDTO);
    ResponseEntity<List<PlaceResponseDTO>> getFilteredPlaceList(Long regionId, Long categoryId, Double rating);
    ResponseEntity<List<PlaceResponseDTO>> searchByName(String placeName);
    ResponseEntity<Boolean> addFavorites(String token, Long id);
    ResponseEntity<Boolean> deleteFavorites(String token, Long id);
}
