package com.travello.service.impl;

import com.travello.dto.request.BlogRequestDTO;
import com.travello.dto.response.BlogResponseDTO;
import com.travello.entity.Blog;
import com.travello.repository.BlogRepository;
import com.travello.service.BlogService;
import com.travello.util.mapper.BlogMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private BlogMapper blogMapper;

    @Override
    public BlogResponseDTO saveBlog(BlogRequestDTO blogRequestDTO) {
        Blog blog = blogMapper.mapToBlog(blogRequestDTO);
        Blog returnedDatabaseBlog = blogRepository.save(blog);
        return blogMapper.mapToResponse(returnedDatabaseBlog);
    }

    @Override
    public List<BlogResponseDTO> getBlogList() {
        List<BlogResponseDTO> response = new ArrayList<>();
        List<Blog> blogs = blogRepository.findAll();
        blogs.forEach(blog -> response.add(blogMapper.mapToResponse(blog)));
        return response;
    }

    @Override
    public BlogResponseDTO getBlogById(Long id) {
        return blogMapper.mapToResponse(blogRepository.findById(id).orElseThrow());
    }

    @Override
    public boolean deleteBlog(Long id) {
        blogRepository.deleteById(id);
        return !blogRepository.existsById(id);
    }

    @Override
    public BlogResponseDTO updateBlog(Long id, BlogRequestDTO blogRequestDTO) {
        Blog blog = blogMapper.mapToBlog(blogRequestDTO);
        blog.setId(id);
        return blogMapper.mapToResponse(blogRepository.save(blog));
    }
}
