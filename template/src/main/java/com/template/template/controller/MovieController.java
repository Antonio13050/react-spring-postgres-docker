package com.template.template.controller;

import com.template.template.model.transport.MovieResponseDTO;
import com.template.template.model.transport.operations.CreateMovieForm;
import com.template.template.service.MovieService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:5173/", maxAge = 3600)
@RestController
@RequestMapping("/movie")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }


    @PostMapping
    public ResponseEntity<MovieResponseDTO> create(@Valid @RequestBody CreateMovieForm body,
                                                   UriComponentsBuilder uriComponentsBuilder){
        MovieResponseDTO response = this.movieService.create(body);
        return ResponseEntity.created(uriComponentsBuilder.path("/movie/{id}").buildAndExpand(response.id()).toUri()).body(response);
    }

    @GetMapping
    public ResponseEntity<List<MovieResponseDTO>> list(){
        List<MovieResponseDTO> response = this.movieService.list();
        return ResponseEntity.ok(response);
    }
 }
