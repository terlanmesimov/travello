package com.travello.entity;

import com.travello.entity.embedded.Location;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PlaceComment extends Comment {
    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;
    private Double rating;
    @Embedded
    private Location location;
}