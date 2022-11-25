package com.terpFitAssistant.fitBuddy.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terpFitAssistant.fitBuddy.models.Schedules;
import com.terpFitAssistant.fitBuddy.repo.SchedulesRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class SchedulesController {

	@Autowired
	SchedulesRepository schedulesRepository;
	
	@GetMapping("/schedules")
	public ResponseEntity<List<Schedules>> getAllSchedules() {
		try {
			List<Schedules> schedules = new ArrayList<Schedules>();

			schedulesRepository.findAll().forEach(schedule -> schedules.add(schedule));

			if (schedules.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(schedules, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/schedules/{schedule_id}")
	public ResponseEntity<Schedules> updateNoOfBookings(@PathVariable("schedule_id") int schedule_id) {
		
		 	 Schedules sch = schedulesRepository.findBySchedule_id(schedule_id);
		 	 if(sch.getNo_of_bookings() < 10) {
		 		 sch.setNo_of_bookings(sch.getNo_of_bookings()+ 1);
		 		schedulesRepository.updateNoOfAppointments(sch.getNo_of_bookings() , schedule_id);
		 		return new ResponseEntity<>(sch, HttpStatus.OK);
		 	 } else {
		 		sch.setNo_of_bookings(sch.getNo_of_bookings()+ 1);
		 		return new ResponseEntity<>(sch,HttpStatus.ACCEPTED);
		 	 }
	}
}
