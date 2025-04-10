package com.travello.dto.response;

import lombok.Data;

@Data
public class UserResponseDTO {
    private String email;
    private String username;
    private String imageBase64;
}
