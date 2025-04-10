package com.travello.service;

import com.travello.dto.request.BlogRequestDTO;
import com.travello.dto.response.BlogResponseDTO;

import java.util.List;

public interface BlogService {
    BlogResponseDTO saveBlog (BlogRequestDTO blogRequestDTO);
    List<BlogResponseDTO> getBlogList ();
    BlogResponseDTO getBlogById (Long id);
    boolean deleteBlog (Long id);
    BlogResponseDTO updateBlog (Long id, BlogRequestDTO blogRequestDTO);
}
