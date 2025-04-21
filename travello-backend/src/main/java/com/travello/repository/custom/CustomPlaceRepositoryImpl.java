package com.travello.repository.custom;

import com.travello.entity.Place;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import java.util.List;


public class CustomPlaceRepositoryImpl implements CustomPlaceRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Place> findByFilters(Long regionId, Long categoryId, Double rating) {
        StringBuilder queryBuilder = new StringBuilder("SELECT p FROM Place p WHERE 1=1");
        if (regionId != null) {
            queryBuilder.append(" AND p.region.id = :regionId");
        }
        if (categoryId != null) {
            queryBuilder.append(" AND p.category.id = :categoryId");
        }
        if (rating != null) {
            queryBuilder.append(" AND p.rating >= :rating AND p.rating < :rating + 1");
        }

        TypedQuery<Place> typedQuery = entityManager.createQuery(queryBuilder.toString(), Place.class);

        if (regionId != null) {
            typedQuery.setParameter("regionId", regionId);
        }
        if (categoryId != null) {
            typedQuery.setParameter("categoryId", categoryId);
        }
        if (rating != null) {
            typedQuery.setParameter("rating", rating);
        }

        return typedQuery.getResultList();
    }


    public List<Place> searchByName(String placeName) {
        if (placeName == null || placeName.trim().isEmpty()) {
            return List.of();
        }
        String query = "SELECT p FROM Place p WHERE LOWER(p.name) LIKE :placeName";
        TypedQuery<Place> typedQuery = entityManager.createQuery(query, Place.class);
        typedQuery.setParameter("placeName", "%" + placeName.toLowerCase() + "%");
        return typedQuery.getResultList();
    }
}
