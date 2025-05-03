package com.travello.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PlaceRequestDTO {
    private String name;
    private Long regionId;
    private Long categoryId;
    private String description;
    private Double rating;
    private MultipartFile image;
    private Double longitude;
    private Double latitude;
}
