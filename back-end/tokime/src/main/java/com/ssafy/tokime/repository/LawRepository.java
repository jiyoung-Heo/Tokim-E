package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.Law;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LawRepository extends JpaRepository<Law, Long> {
    List<Law> findAllByLawDistrict(Long lawDistrict);

    List<Law> findAllByLawDistrictAndLawLandUseContaining(Long lawDistrict, String lawLandUse);


}
