package com.travello.dto.request;

import com.travello.entity.Category;
import com.travello.entity.Region;
import com.travello.entity.embedded.Location;

public class PlaceRequestDTO {
    private String name;
    private Category category;
    private Region region;
    private String description;
    private byte[] image;
    private Location location;
}
