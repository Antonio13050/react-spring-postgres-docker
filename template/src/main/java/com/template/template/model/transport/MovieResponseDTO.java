package com.template.template.model.transport;

import com.template.template.model.Movie;

import java.time.LocalDateTime;

public record MovieResponseDTO(Long id,
                               String name,
                               LocalDateTime release) {

    public MovieResponseDTO(Movie movie){
        this(movie.getMovieId(), movie.getName(), movie.getRelease());
    }
}
