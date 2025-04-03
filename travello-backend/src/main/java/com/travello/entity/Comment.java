package com.travello.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "comment")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "user")
    private User user;

    @Column(name = "opinion")
    private String opinion;

    @Column(name = "rate")
    private String rate;

    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
}
