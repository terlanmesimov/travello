package com.travello.dto.response;

import com.travello.dto.request.PlaceRequestDTO;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class BlogResponseDTO {
    private Long id;
    private String name;
    private String author;
    private String imageBase64;
    private String description;
    private LocalDate createdAt;
    private List<PlaceResponseDTO> places;
    private List<String> comments;
}
