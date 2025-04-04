package com.travello.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Location {
    @Column(name = "latitude", nullable = false)
    private Double latitude;
    @Column(name = "longitude", nullable = false)
    private Double longitude;
}
