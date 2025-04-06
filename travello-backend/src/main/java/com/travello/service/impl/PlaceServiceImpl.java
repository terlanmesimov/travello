package com.travello.service.impl;

import com.travello.dto.request.PlaceRequestDTO;
import com.travello.dto.response.PlaceResponseDTO;
import com.travello.entity.Category;
import com.travello.entity.Place;
import com.travello.entity.Region;
import com.travello.entity.embedded.Location;
import com.travello.repository.CategoryRepository;
import com.travello.repository.PlaceRepository;
import com.travello.repository.RegionRepository;
import com.travello.service.PlaceService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlaceServiceImpl implements PlaceService {

    @Autowired private PlaceRepository placeRepository;
    @Autowired private RegionRepository regionRepository;
    @Autowired private CategoryRepository categoryRepository;
    @Autowired private ModelMapper modelMapper;

    @Override
    public PlaceResponseDTO savePlace(PlaceRequestDTO placeRequestDTO) {
//        modelMapper.map(placeRequestDTO, Place.class);
        Place place = new Place();
        place.setName(placeRequestDTO.getName());
        place.setDescription(placeRequestDTO.getDescription());
        place.setRating(placeRequestDTO.getRating());
        place.setImage(null);
        place.setLocation(new Location(placeRequestDTO.getLatitude(),placeRequestDTO.getLongitude()));
        Category category = categoryRepository.findById(placeRequestDTO.getCategoryId()).orElseThrow();
        Region region = regionRepository.findById(placeRequestDTO.getRegionId()).orElseThrow();
        place.setCategory(category);
        place.setRegion(region);
        PlaceResponseDTO response = modelMapper.map(placeRepository.save(place), PlaceResponseDTO.class);
        return response;
    }

    @Override
    public List<PlaceResponseDTO> getPlaceList() {
        List<PlaceResponseDTO> response = new ArrayList<>();
        List<Place> placeList = placeRepository.findAll();
        for (Place place : placeList) {
            response.add(modelMapper.map(place, PlaceResponseDTO.class));
        }
        return response;
    }

    @Override
    public PlaceResponseDTO getPlaceById(Long id) {
        Optional<Place> optional = placeRepository.findById(id);
        if (optional.isPresent()) {
            PlaceResponseDTO response = modelMapper.map(optional.get(), PlaceResponseDTO.class);
            return response;
        }
        return null;
    }

    @Override
    public boolean deletePlace(Long id) {
        placeRepository.deleteById(id);
        boolean isDeleted = placeRepository.findById(id).isEmpty();
        return isDeleted;
    }

    @Override
    public PlaceResponseDTO updatePlace(Long id, PlaceRequestDTO placeRequestDTO) {
        Place place = modelMapper.map(placeRequestDTO, Place.class);
        place.setId(id);
        PlaceResponseDTO response = modelMapper.map(placeRepository.save(place), PlaceResponseDTO.class);
        return response;
    }
}
