package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.Danger;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DangerRepository extends JpaRepository<Danger, Long> {
}
