package com.terpFitAssistant.fitBuddy.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.terpFitAssistant.fitBuddy.models.Exercise;


public interface ExercisesRepository extends JpaRepository<Exercise, Long> {
	  @Query(value = "SELECT * FROM list_exercises where goals_id =:goals_id", nativeQuery = true)
	  List<Exercise> findAllBygoals_id(@Param("goals_id")int goals_id );
}
