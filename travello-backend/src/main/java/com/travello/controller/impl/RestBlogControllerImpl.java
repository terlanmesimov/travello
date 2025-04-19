package com.travello.controller.impl;

import com.travello.controller.RestBlogController;
import com.travello.dto.request.BlogRequestDTO;
import com.travello.dto.response.BlogResponseDTO;
import com.travello.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/api/blog")
@CrossOrigin(origins = "http://localhost:3000")
public class RestBlogControllerImpl implements RestBlogController {

    @Autowired
    private BlogService blogService;

    @Override
    @PostMapping("/save-blog")
    public BlogResponseDTO saveBlog(@RequestBody BlogRequestDTO blogRequestDTO) {
        return blogService.saveBlog(blogRequestDTO);
    }

    @Override
    @GetMapping("/list")
    public List<BlogResponseDTO> getBlogList() {
        return blogService.getBlogList();
    }

    @Override
    @GetMapping("/get-by-id/{id}")
    public BlogResponseDTO getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public boolean deleteBlog(@PathVariable Long id) {
        return blogService.deleteBlog(id);
    }

    @Override
    @PutMapping("/update/{id}")
    public BlogResponseDTO updateBlog(@PathVariable Long id,@RequestBody BlogRequestDTO blogRequestDTO) {
        return blogService.updateBlog(id, blogRequestDTO);
    }
}
