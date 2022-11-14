package com.terpFitAssistant.fitBuddy.models;

import javax.persistence.*;

@Entity
@Table(name = "list_exercises")
public class Exercise {

	@Id
	@Column(name = "list_id")
	private int list_id;

	@Column(name = "goals_id")
	private int goals_id;

	@Column(name = "list_of_exercises")
	private String list_of_exercises;
	
	@Column(name = "exercise_description")
	private String exercise_description;

	@Column(name = "link")
	private String link;

	public Exercise() {

	}

	public Exercise(int list_id , int goals_id , String list_of_exercises, String exercise_description, String link) {
		this.list_id = list_id;
		this.goals_id = goals_id;
		this.list_of_exercises = list_of_exercises;
		this.exercise_description = exercise_description;
		this.link = link;
	}

	public long getList_id() {
		return list_id;
	}

	public void setList_id(int list_id) {
		this.list_id = list_id;
	}

	public long getGoals_id() {
		return goals_id;
	}

	public void setGoals_id(int goals_id) {
		this.goals_id = goals_id;
	}

	public String getList_of_exercises() {
		return list_of_exercises;
	}

	public void setList_of_exercises(String list_of_exercises) {
		this.list_of_exercises = list_of_exercises;
	}

	public String getExercise_description() {
		return exercise_description;
	}

	public void setExercise_description(String exercise_description) {
		this.exercise_description = exercise_description;
	}
}
