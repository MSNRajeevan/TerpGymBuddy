package com.terpFitAssistant.fitBuddy.models;

import javax.persistence.*;

@Entity
@Table(name = "goals")
public class Goals {

	@Id
	@Column(name = "goals_id")
	private int goals_id;

	@Column(name = "goal_description")
	private String goal_description;

	public Goals() {

	}

	public Goals(int goals_id, String goal_description) {
		this.goals_id = goals_id;
		this.goal_description = goal_description;
	}

	public long getGoalId() {
		return goals_id;
	}

	public String getGoalDescription() {
		return goal_description;
	}

	public void setGoalId(int goals_id) {
		this.goals_id = goals_id;
	}

	public void setGoalDescription(String goal_description) {
		this.goal_description = goal_description;
	}

}
