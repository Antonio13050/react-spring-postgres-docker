package com.template.template.model;

import com.template.template.model.transport.operations.CreateMovieForm;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id")
    private Long movieId;
    private String name;
    private LocalDateTime release;

    public Movie() {
    }

    public Movie(CreateMovieForm form) {
        this.name = form.name();
        this.release = form.release();
    }

    public Long getMovieId() {
        return movieId;
    }

    public String getName() {
        return name;
    }

    public LocalDateTime getRelease() {
        return release;
    }
}
