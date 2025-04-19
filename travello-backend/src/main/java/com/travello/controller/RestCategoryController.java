package com.travello.controller;

import com.travello.dto.response.CategoryResponseDTO;

import java.util.List;

public interface RestCategoryController {
    CategoryResponseDTO getCategoryById(Long id);
    List<CategoryResponseDTO> getCategoryList();
}
