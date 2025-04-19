package com.travello.controller.impl;

import com.travello.controller.RestCategoryController;
import com.travello.dto.response.CategoryResponseDTO;
import com.travello.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/api/category")
@CrossOrigin(origins = "http://localhost:3000")
public class RestCategoryControllerImpl implements RestCategoryController {
    @Autowired
    private CategoryService categoryService;

    @Override
    @GetMapping("/get-by-id/{id}")
    public CategoryResponseDTO getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @Override
    @GetMapping("/list")
    public List<CategoryResponseDTO> getCategoryList() {
        return categoryService.getCategoryList();
    }
}
