package com.travello.service;

import com.travello.dto.response.CategoryResponseDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryResponseDTO> getCategoryList();
    CategoryResponseDTO getCategoryById(Long id);
}
