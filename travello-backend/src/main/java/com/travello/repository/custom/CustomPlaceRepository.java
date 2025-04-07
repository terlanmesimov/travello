package com.travello.repository.custom;

import com.travello.entity.Place;
import java.util.List;

public interface CustomPlaceRepository {
    List<Place> findByFilters(Long regionId, Long categoryId, Double rating);
    List<Place> searchByName(String placeName);
}
