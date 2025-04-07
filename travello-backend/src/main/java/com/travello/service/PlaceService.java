package com.travello.service;

import com.travello.dto.request.PlaceRequestDTO;
import com.travello.dto.response.PlaceResponseDTO;

import java.util.List;

public interface PlaceService {
    PlaceResponseDTO savePlace(PlaceRequestDTO placeRequestDTO);
    List<PlaceResponseDTO> getPlaceList();
    PlaceResponseDTO getPlaceById(Long id);
    boolean deletePlace(Long id);
    PlaceResponseDTO updatePlace(Long id, PlaceRequestDTO placeRequestDTO);
    List<PlaceResponseDTO> getFilteredPlaceList(Long regionId, Long categoryId, Double rating);
    List<PlaceResponseDTO> searchByName(String placeName);
}
