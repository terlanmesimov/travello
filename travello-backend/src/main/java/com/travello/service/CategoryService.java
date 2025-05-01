package com.travello.service;

import com.travello.dto.response.CategoryResponseDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CategoryService {
    ResponseEntity<List<CategoryResponseDTO>> getCategoryList();
    ResponseEntity<CategoryResponseDTO> getCategoryById(Long id);
}
