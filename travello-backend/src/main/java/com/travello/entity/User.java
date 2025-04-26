package com.travello.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] image;
    private String imageType;
    @OneToMany(mappedBy = "user")
    private List<Comment> comments;
    @ManyToMany
    @JoinTable(
            name = "place_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "place_id")
    )
    private List<Place> favorites;
}
