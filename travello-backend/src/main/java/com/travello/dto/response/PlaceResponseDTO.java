package com.travello.dto.response;

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
    private List<String> comments;
    private String imageBase64;
    private List<Long> blogIds;
    private Double latitude;
    private Double longitude;
}
