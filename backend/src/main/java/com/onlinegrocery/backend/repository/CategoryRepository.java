package com.onlinegrocery.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlinegrocery.backend.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    
}
