package com.travello.repository;

import com.travello.entity.Place;
import com.travello.repository.custom.CustomPlaceRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<Place, Long>, CustomPlaceRepository {
}
