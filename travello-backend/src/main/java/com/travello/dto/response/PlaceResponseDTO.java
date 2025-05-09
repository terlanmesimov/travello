package com.travello.dto.response;

import com.travello.entity.embedded.Location;
import lombok.Data;
import java.util.List;

@Data
public class PlaceResponseDTO {
    private Long id;
    private String name;
    private String regionName;
    private String categoryName;
    private String description;
    private Double rating;
    private List<CommentResponseDTO> comments;
    private String imageBase64;
    private Location location;
}
