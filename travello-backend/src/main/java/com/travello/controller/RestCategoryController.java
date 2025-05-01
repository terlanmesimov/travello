package com.travello.controller;

import com.travello.dto.response.CategoryResponseDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RestCategoryController {
    ResponseEntity<CategoryResponseDTO> getCategoryById(Long id);
    ResponseEntity<List<CategoryResponseDTO>> getCategoryList();
}
