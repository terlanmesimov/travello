package com.travello.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegionResponseDTO {
    private Long id;
    private String name;
    private List<Long> placeIds;
}
