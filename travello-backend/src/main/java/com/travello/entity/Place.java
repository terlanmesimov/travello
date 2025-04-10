package com.travello.entity;

import com.travello.entity.embedded.Location;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "place")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "region_id")
    private Region region;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    private String description;
    private Double rating;
    @OneToMany(mappedBy = "place")
    private List<PlaceComment> comments;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] image;
    @ManyToMany(mappedBy = "places")
    private List<Blog> blogs;
    @Embedded
    private Location location;

}
