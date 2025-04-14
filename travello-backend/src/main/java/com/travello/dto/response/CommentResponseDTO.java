package com.travello.dto.response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CommentResponseDTO {
    private Long id;
    private Long userId;
    private String text;
    private Double rating;
    private LocalDateTime createdAt;
    private String dtype;
    private Long blogId;
    private Long placeId;
}
