package com.travello.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "blog")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String author;
    private String description;
    private LocalDate createdAt;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] image;
    @ManyToMany
    @JoinTable(
            name = "place_blog",
            joinColumns = @JoinColumn(name = "blog_id"),
            inverseJoinColumns = @JoinColumn(name = "place_id")
    )
    private List<Place> places;
    @OneToMany(mappedBy = "blog")
    private List<BlogComment> comments;
}
