package com.travello.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentResponseDTO {
    private Long id;
    private String text;
    private Double rating;
    private String username;
    private LocalDateTime createdAt;
    private Long blogId;
    private Long placeId;
    private String profilePictureBase64;
}
