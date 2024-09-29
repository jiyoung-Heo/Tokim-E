package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.Land;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LandRepository extends JpaRepository<Land, Long> {

    @Query("SELECT l " +
            "FROM Land l " +
            "WHERE l.landDistrict LIKE %:district% AND l.landAddress = :address")
    List<Land> findByDistrictAndAddress(@Param("district") String district, @Param("address") String address);
    // 최대 5개 결과 반환
    default List<Land> findTop5ByDistrictAndAddress(String district, String address) {
        List<Land> lands = findByDistrictAndAddress(district, address);
        return lands.size() > 5 ? lands.subList(0, 5) : lands;
    }
}
