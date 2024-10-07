package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.Land;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LandRepository extends JpaRepository<Land, Long> {

@Query("SELECT l FROM Land l WHERE l.landDistrict LIKE %:district% AND l.landAddress = :address")
List<Land> findTop5ByDistrictAndAddress(@Param("district") String district, @Param("address") String address, Pageable pageable);

    @Query("SELECT l FROM Land l WHERE l.landDistrict LIKE %:district%")
    List<Land> findTop5ByDistrict(@Param("district") String district, Pageable pageable);

    @Query(value = "SELECT * FROM land WHERE MATCH(land_district) AGAINST (CONCAT(:district, '*') IN BOOLEAN MODE)", nativeQuery = true)
    List<Land> findTop5ByDistrictFullText(@Param("district") String district, Pageable pageable);

    @Query("SELECT l FROM Land l WHERE l.landAddress LIKE :address%")
    List<Land> findTop5ByAddress(@Param("address") String address, Pageable pageable);

}
