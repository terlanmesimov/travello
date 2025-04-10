package com.travello.service.impl;

import com.travello.dto.request.PlaceRequestDTO;
import com.travello.dto.response.PlaceResponseDTO;
import com.travello.entity.Place;
import com.travello.repository.PlaceRepository;
import com.travello.service.PlaceService;
import com.travello.util.mapper.PlaceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceServiceImpl implements PlaceService {

    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private PlaceMapper placeMapper;

    @Override
    public PlaceResponseDTO savePlace(PlaceRequestDTO placeRequestDTO) {
        Place place = placeMapper.mapToPlace(placeRequestDTO);
        Place returnedDatabasePlace = placeRepository.save(place);
        return placeMapper.mapToResponse(returnedDatabasePlace);
    }

    @Override
    public List<PlaceResponseDTO> getPlaceList() {
        List<Place> placeList = placeRepository.findAll();
        return placeMapper.mapToResponseDTOList(placeList);
    }

    @Override
    public PlaceResponseDTO getPlaceById(Long id) {
        return placeMapper.mapToResponse(placeRepository.findById(id).orElseThrow());
    }

    @Override
    public boolean deletePlace(Long id) {
        placeRepository.deleteById(id);
        return !placeRepository.existsById(id);
    }

    @Override
    public PlaceResponseDTO updatePlace(Long id, PlaceRequestDTO placeRequestDTO) {
        Place place = placeMapper.mapToPlace(placeRequestDTO);
        place.setId(id);
        return placeMapper.mapToResponse(placeRepository.save(place));
    }

    @Override
    public List<PlaceResponseDTO> getFilteredPlaceList(Long regionId, Long categoryId, Double rating) {
        List<Place> placeList = placeRepository.findByFilters(regionId, categoryId, rating);
        return placeMapper.mapToResponseDTOList(placeList);
    }

    @Override
    public List<PlaceResponseDTO> searchByName(String placeName) {
        List<Place> placeList = placeRepository.searchByName(placeName);
        return placeMapper.mapToResponseDTOList(placeList);
    }
}
