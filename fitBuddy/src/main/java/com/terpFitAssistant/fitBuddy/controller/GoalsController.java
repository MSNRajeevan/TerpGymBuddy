package com.terpFitAssistant.fitBuddy.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terpFitAssistant.fitBuddy.models.Goals;
import com.terpFitAssistant.fitBuddy.repo.GoalsRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class GoalsController {

	@Autowired
	GoalsRepository goalsRepository;

	@GetMapping("/goals")
	public ResponseEntity<List<Goals>> getAllGoals() {
		try {
			List<Goals> goals = new ArrayList<Goals>();

			goalsRepository.findAll().forEach(goal -> goals.add(goal));

			if (goals.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(goals, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
