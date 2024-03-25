package com.template.template.model.transport.operations;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreateMovieForm(@NotBlank String name,
                              @NotNull LocalDateTime release) {
}
