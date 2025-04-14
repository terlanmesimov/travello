package com.travello.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class BlogResponseDTO {
    private Long id;
    private String name;
    private String author;
    private String imageBase64;
    private String description;
    private LocalDateTime createdAt;
    private List<PlaceResponseDTO> places;
    private List<CommentResponseDTO> comments;
}
