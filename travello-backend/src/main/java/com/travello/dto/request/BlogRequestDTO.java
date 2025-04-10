package com.travello.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class BlogRequestDTO {
    private String name;
    private String author;
    private String description;
    private List<Long> placeIds;
    private String imageBase64;
}
