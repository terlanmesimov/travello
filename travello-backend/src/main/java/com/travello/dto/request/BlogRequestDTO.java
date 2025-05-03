package com.travello.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class BlogRequestDTO {
    private String name;
    private String author;
    private String description;
    private List<Long> placeIds;
    private MultipartFile image;
}
