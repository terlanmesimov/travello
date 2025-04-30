package com.travello.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentResponseDTO {
    private Long id;
    private String text;
    private Double rating;
    private String username;
    private Long placeId;
    private String placeName;
    private Long blogId;
    private String blogName;
    private String profilePictureBase64;
    private LocalDateTime createdAt;
}
