package com.travello.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("place")
public class PlaceComment extends Comment {
    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;
    private Double rating;
}