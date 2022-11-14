package com.terpFitAssistant.fitBuddy.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.terpFitAssistant.fitBuddy.models.Appointment;



public interface AppointmentsRepository extends JpaRepository<Appointment, Long> {

}
