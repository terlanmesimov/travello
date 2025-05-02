package com.travello.util.mapper;

import com.travello.dto.request.PlaceRequestDTO;
import com.travello.dto.response.CommentResponseDTO;
import com.travello.dto.response.PlaceResponseDTO;
import com.travello.entity.Category;
import com.travello.entity.Place;
import com.travello.entity.Region;
import com.travello.entity.embedded.Location;
import com.travello.repository.CategoryRepository;
import com.travello.repository.RegionRepository;
import com.travello.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class PlaceMapper {

    private final RegionRepository regionRepository;
    private final CategoryRepository categoryRepository;
    private final CommentMapper commentMapper;

    public Place mapToPlace(PlaceRequestDTO request) {
        Place place = new Place();
        place.setName(request.getName());
        place.setDescription(request.getDescription());
        place.setRating(request.getRating());
        try {
            Map<String, String> image = ImageUtil.convertMultipartDataFileToBase64(request.getImage());
            place.setImage(ImageUtil.decodeImageToBytes(image.get("base64String")));
            place.setImageType(image.get("mimiType"));
        } catch (IOException io) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Image Not Serializable");
        }
        place.setLocation(new Location(request.getLatitude(), request.getLongitude()));
        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow();
        Region region = regionRepository.findById(request.getRegionId()).orElseThrow();
        place.setCategory(category);
        place.setRegion(region);
        return place;
    }

    public PlaceResponseDTO mapToResponse(Place place) {
        PlaceResponseDTO response = new PlaceResponseDTO();
        response.setId(place.getId());
        response.setName(place.getName());
        response.setDescription(place.getDescription());
        response.setRating(place.getRating());
        response.setCategoryName(place.getCategory().getName());
        response.setRegionName(place.getRegion().getName());
        response.setLocation(new Location(place.getLocation().getLatitude(), place.getLocation().getLongitude()));
        response.setImageBase64(ImageUtil.joinBase64(place.getImageType(),
                ImageUtil.encodeImageToBase64String(place.getImage())));
        List<CommentResponseDTO> comments = new ArrayList<>();
        if(place.getComments() != null ){
            place.getComments().forEach(placeComment -> comments.add(commentMapper.mapToResponse(placeComment)));
        }
        response.setComments(comments);
        return response;
    }

    public List<PlaceResponseDTO> mapToResponseDTOList(List<Place> placeList) {
        List<PlaceResponseDTO> response = new ArrayList<>();
        for (Place place : placeList) {
            response.add(mapToResponse(place));
        }
        return response;
    }
}
