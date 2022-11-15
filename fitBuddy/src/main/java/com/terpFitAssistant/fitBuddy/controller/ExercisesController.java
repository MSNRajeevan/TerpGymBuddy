package com.terpFitAssistant.fitBuddy.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terpFitAssistant.fitBuddy.models.Exercise;
import com.terpFitAssistant.fitBuddy.repo.ExercisesRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ExercisesController {

	@Autowired
	ExercisesRepository exercisesRepository;

	@GetMapping("/exercises/{goals_id}")
	public ResponseEntity<Exercise> getTutorialById(@PathVariable("goals_id") int goals_id) {
		List<Exercise> ExercisesById = new ArrayList<Exercise>();
		exercisesRepository.findAllBygoals_id(goals_id).forEach(exercise -> ExercisesById.add(exercise));

		if (ExercisesById.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(ExercisesById.get(goals_id), HttpStatus.OK);
		}
	}
}
