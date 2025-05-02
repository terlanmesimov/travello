package com.travello.controller.impl;

import com.travello.controller.RestCategoryController;
import com.travello.dto.response.CategoryResponseDTO;
import com.travello.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rest/api/category")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
public class RestCategoryControllerImpl implements RestCategoryController {

    private final CategoryService categoryService;

    @Override
    @GetMapping("/get/{id}")
    public ResponseEntity<CategoryResponseDTO> getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @Override
    @GetMapping("/list")
    public ResponseEntity<List<CategoryResponseDTO>> getCategoryList() {
        return categoryService.getCategoryList();
    }
}
