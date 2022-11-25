package com.terpFitAssistant.fitBuddy.models;

import javax.persistence.*;

@Entity
@Table(name = "gym_schedules")
public class Schedules {

	@Id
	@Column(name = "schedule_id")
	private int schedule_id;

	@Column(name = "timings")
	private String timing;
	
	@Column(name = "no_of_bookings")
	private int no_of_bookings;

	public Schedules() {

	}

	public int getSchedule_id() {
		return schedule_id;
	}

	public void setSchedule_id(int schedule_id) {
		this.schedule_id = schedule_id;
	}

	public String getTiming() {
		return timing;
	}

	public void setTiming(String timing) {
		this.timing = timing;
	}

	public int getNo_of_bookings() {
		return no_of_bookings;
	}

	public void setNo_of_bookings(int no_of_bookings) {
		this.no_of_bookings = no_of_bookings;
	}
}
