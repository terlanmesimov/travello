package com.travello.dto.response;

import com.travello.entity.Category;
import com.travello.entity.PlaceComment;
import com.travello.entity.Region;
import com.travello.entity.embedded.Location;

import java.util.List;

public class PlaceResponseDTO {
    private String name;
    private Region region;
    private Category category;
    private String description;
    private byte[] image;
    private Location location;
    private List<PlaceComment> comments;
}
