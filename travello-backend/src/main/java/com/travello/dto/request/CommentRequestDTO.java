package com.travello.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentRequestDTO {
    private Long userId;
    private String text;
    private Double rating;
    private LocalDateTime createdAt;
    private Long blogId;
    private Long placeId;
}
