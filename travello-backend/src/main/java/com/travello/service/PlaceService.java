package com.travello.service;

import com.travello.dto.request.PlaceRequestDTO;
import com.travello.dto.response.PlaceResponseDTO;

import java.util.List;

public interface PlaceService {
    public PlaceResponseDTO savePlace(PlaceRequestDTO placeRequestDTO);
    public List<PlaceResponseDTO> getPlaceList();
    public PlaceResponseDTO getPlaceById(Long id);
    public boolean deletePlace (Long id);
    public PlaceResponseDTO updatePlace(Long id , PlaceRequestDTO placeRequestDTO);
}
