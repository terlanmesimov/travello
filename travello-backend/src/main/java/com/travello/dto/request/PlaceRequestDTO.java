package com.travello.dto.request;

import com.travello.dto.response.CommentResponseDTO;
import com.travello.entity.embedded.Location;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
