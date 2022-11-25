package com.terpFitAssistant.fitBuddy.repo;


import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.terpFitAssistant.fitBuddy.models.Schedules;


@Transactional
public interface SchedulesRepository extends JpaRepository<Schedules, Long> {

	  
	  @Query(value = "SELECT * FROM gym_schedules where schedule_id =:schedule_id", nativeQuery = true)
	  Schedules findBySchedule_id(@Param("schedule_id")int schedule_id );
	  
	  @Modifying
	  @Query(value = "UPDATE gym_schedules SET no_of_bookings = :no_of_bookings WHERE schedule_id =:schedule_id", nativeQuery = true)
	  void updateNoOfAppointments(@Param("no_of_bookings")int no_of_bookings , @Param("schedule_id")int schedule_id );

}