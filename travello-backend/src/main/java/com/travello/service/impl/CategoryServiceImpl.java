package com.travello.service.impl;

import com.travello.dto.response.CategoryResponseDTO;
import com.travello.entity.Category;
import com.travello.repository.CategoryRepository;
import com.travello.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<List<CategoryResponseDTO>> getCategoryList() {
        List<CategoryResponseDTO> response = new ArrayList<>();
        List<Category> categoryList = categoryRepository.findAll();
        categoryList.forEach(category -> {
            List<Long> placeIds = new ArrayList<>();
            category.getPlaces().forEach(place -> placeIds.add(place.getId()));
            response.add(new CategoryResponseDTO(category.getId(), category.getName(), placeIds));
        });
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<CategoryResponseDTO> getCategoryById(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow();
        List<Long> placeIds = new ArrayList<>();
        category.getPlaces().forEach(place -> placeIds.add(place.getId()));
        CategoryResponseDTO response = new CategoryResponseDTO(category.getId(), category.getName(), placeIds);
        return ResponseEntity.ok(response);
    }
}
