package com.travello.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
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

    @Temporal(TemporalType.DATE)
    private Date date;

    private String description;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] image;

    private List<Place> places;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL)
    private List<Comment> comments;

}
