import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Exercises } from 'src/app/models/exercises.model';
import { AuthService } from 'src/app/services/auth.service';
import { ExercisesService } from 'src/app/services/exercises.service';
import { GoalsService } from 'src/app/services/goals.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  exercises:Exercises[] = [];
  suggestedExercise= false;
  gotCalenderEvents = false;
  obtainedEvents: any[] | undefined;
  toadysUserEvents :any[] = [];
  constructor(public auth: AuthService, private datePipe: DatePipe ,  private fb: FormBuilder , private goalService:GoalsService , private exercisesService:ExercisesService ) { 

    this.auth.getCalendar();

  }
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  ngOnInit(): void {
    this.exercisesService.getExerciseByGoalID(this.goalService.selectedGoal).subscribe(
      response =>{
        this.exercises=response;
        this.suggestedExercise = true;},
     );
  }
  getCalenderEvents() {
    this.toadysUserEvents = [];
    this.obtainedEvents = this.auth.calendarItems;
    this.obtainedEvents?.forEach(calevent => {
      if(this.datePipe.transform(calevent.start.dateTime, 'yyyy-MM-dd') == this.datePipe.transform(this.serializedDate.value, 'yyyy-MM-dd')) {
        this.toadysUserEvents.push(calevent);
      }
    }
      );
    this.gotCalenderEvents = true;
  }
}
