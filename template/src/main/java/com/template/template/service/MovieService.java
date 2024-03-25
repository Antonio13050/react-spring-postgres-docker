package com.template.template.service;

import com.template.template.model.Movie;
import com.template.template.model.transport.MovieResponseDTO;
import com.template.template.model.transport.operations.CreateMovieForm;
import com.template.template.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public MovieResponseDTO create(CreateMovieForm form){
        Movie movie = new Movie(form);
        this.movieRepository.save(movie);
        return new MovieResponseDTO(movie);
    }

    public List<MovieResponseDTO> list() {
        return this.movieRepository.findAll()
                .stream().map(MovieResponseDTO::new).collect(Collectors.toList());
    }
}
