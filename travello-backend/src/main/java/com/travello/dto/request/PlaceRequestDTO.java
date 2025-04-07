package com.travello.dto.request;

import com.travello.entity.embedded.Location;
import lombok.Data;

@Data
public class PlaceRequestDTO {
    private String name;
    private Long regionId;
    private Long categoryId;
    private String description;
    private Double rating;
    private String image;
    private Location location;
}
