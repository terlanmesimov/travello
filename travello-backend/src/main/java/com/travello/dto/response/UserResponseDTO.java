package com.travello.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class UserResponseDTO {
    private String username;
    private String email;
    private String profilePictureBase64;
    private List<CommentResponseDTO> comments;
    private List<PlaceResponseDTO> favorites;
}
