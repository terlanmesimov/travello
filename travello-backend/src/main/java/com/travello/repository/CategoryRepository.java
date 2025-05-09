package com.travello.repository;

import com.travello.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Long findByName(String name);
}
