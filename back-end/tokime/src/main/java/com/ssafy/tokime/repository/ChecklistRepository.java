package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChecklistRepository extends JpaRepository<Checklist,Integer> {
}
