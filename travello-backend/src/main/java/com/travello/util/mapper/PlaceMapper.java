package com.travello.util.mapper;

import com.travello.dto.request.PlaceRequestDTO;
import com.travello.dto.response.PlaceResponseDTO;
import com.travello.entity.Category;
import com.travello.entity.Place;
import com.travello.entity.Region;
import com.travello.entity.embedded.Location;
import com.travello.repository.CategoryRepository;
import com.travello.repository.RegionRepository;
import com.travello.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;


public class PlaceMapper {
    @Autowired
    private RegionRepository regionRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public Place mapToPlace(PlaceRequestDTO request){
        Place place = new Place();
        place.setName(request.getName());
        place.setDescription(request.getDescription());
        place.setRating(request.getRating());
        place.setImage(ImageUtil.decodeImageToBytes(request.getImage()));
        place.setLocation(new Location(request.getLocation().getLatitude(), request.getLocation().getLongitude()));
        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow();
        Region region = regionRepository.findById(request.getRegionId()).orElseThrow();
        place.setCategory(category);
        place.setRegion(region);
        return place;
    }
    
    public PlaceResponseDTO mapToResponse(Place returnedDatabasePlace) {
        PlaceResponseDTO response = new PlaceResponseDTO();
        response.setId(returnedDatabasePlace.getId());
        response.setName(returnedDatabasePlace.getName());
        response.setDescription(returnedDatabasePlace.getDescription());
        response.setRating(returnedDatabasePlace.getRating());
        response.setCategoryName(returnedDatabasePlace.getCategory().getName());
        response.setRegionName(returnedDatabasePlace.getRegion().getName());
        response.setLocation(new Location(returnedDatabasePlace.getLocation().getLatitude(), returnedDatabasePlace.getLocation().getLongitude()));
        response.setImageBase64(ImageUtil.encodeImageToBase64String(returnedDatabasePlace.getImage()));
        return response;
    }

    public List<PlaceResponseDTO> mapToResponseDTOList (List<Place> placeList ) {
        List<PlaceResponseDTO> response = new ArrayList<>();
        for (Place place : placeList){
            response.add(mapToResponse(place));
        }
        return response;
    }
}
