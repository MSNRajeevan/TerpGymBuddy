import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Exercises } from 'src/app/models/exercises.model';
import { Schedules } from 'src/app/models/schedules.model';
import { AuthService } from 'src/app/services/auth.service';
import { ExercisesService } from 'src/app/services/exercises.service';
import { GoalsService } from 'src/app/services/goals.service';
import { SchedulesService } from 'src/app/services/schedules.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  exercises: Exercises[] = [];
  schedules: Schedules[] = [];
  remainingSchedules: Schedules[] = [];
  finalRemainingSchedules: Schedules[] = [];
  suggestedExercise = false;
  gotCalenderEvents = false;
  obtainedEvents: any[] | undefined;
  selectedSlot: any;
  finalResponse : any;
  showSlots = false;
  showAppointmentButton = false;
  constructor(
    public auth: AuthService,
    private datePipe: DatePipe,
    private goalService: GoalsService,
    private exercisesService: ExercisesService,
    private schedulesService: SchedulesService,
    private _snackBar: MatSnackBar,
    public router: Router
  ) {
    this.auth.getCalendar();
  }
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  ngOnInit(): void {
    this.exercisesService
      .getExerciseByGoalID(this.goalService.selectedGoal)
      .subscribe((response) => {
        this.exercises = response;
        this.suggestedExercise = true;
      });

    this.schedulesService.getSchedules().subscribe((response) => {
      this.schedules = response;
    });
    this.finalRemainingSchedules = [];
    this.finalRemainingSchedules.length = 0;
  }
  getCalenderEvents() {
    this.obtainedEvents = this.auth.calendarItems;
    this.gotCalenderEvents = true;
  }

  selectTimeOfTheDat(e: any) {
    this.finalRemainingSchedules = [];
    this.finalRemainingSchedules.length = 0;
    this.remainingSchedules = [];
    this.remainingSchedules.length = 0;
    if (e.target.value == 'AM') {
      this.schedules?.forEach((tdsch) => {
        if (
          (tdsch.no_of_bookings < 10) && (
          tdsch.schedule_id == 700 ||
          tdsch.schedule_id == 701 ||
          tdsch.schedule_id == 702 ||
          tdsch.schedule_id == 703 ||
          tdsch.schedule_id == 704 ||
          tdsch.schedule_id == 705 ||
          tdsch.schedule_id == 789)
        ) {
          this.remainingSchedules.push(tdsch);
        }
      });
    } else if (e.target.value == 'PM') {
      this.schedules?.forEach((tdsch) => {
        if (
          (tdsch.no_of_bookings < 10) && (
          tdsch.schedule_id == 706 ||
          tdsch.schedule_id == 707 ||
          tdsch.schedule_id == 708 ||
          tdsch.schedule_id == 709 ||
          tdsch.schedule_id == 710 ||
          tdsch.schedule_id == 711 ||
          tdsch.schedule_id == 712 ||
          tdsch.schedule_id == 713 ||
          tdsch.schedule_id == 714 ||
          tdsch.schedule_id == 715)
        ) {
          this.remainingSchedules.push(tdsch);
        }
      });
    }
    this.showSlots = true;
    this.getfinalSchedules();
  }

  getfinalSchedules() {
    this.obtainedEvents?.forEach((calevent) => {
      if (
        this.datePipe.transform(calevent.start.dateTime, 'yyyy-MM-dd') ==
        this.datePipe.transform(this.serializedDate.value, 'yyyy-MM-dd')
      ) {
        this.remainingSchedules?.forEach((sch) => {
          if (
            this.datePipe.transform(calevent.start.dateTime, 'hh:mm:ss') ==
            sch.timing
          ) {
            this.remainingSchedules = this.remainingSchedules.filter(item => item.timing !== sch.timing);
            console.log('Same date found');
          }
        });
      }
    });
  }

  changeSlot(e: any) {
    this.selectedSlot = e.target.value;
    this.showAppointmentButton = true;
  }

  bookAppointment() {
      this.schedulesService.updateBooking(this.selectedSlot)
      .subscribe((response) => { 
        if(response.no_of_bookings <= 10) {
          this.finalResponse = response;
          this._snackBar.open('Booked Appointment', this.finalResponse.timing);
          this.reloadCurrentRoute();
        } else {
          this._snackBar.open('Booking Failed - Exceeded Max Appointments for the slot-', this.finalResponse.timing);
          this.auth.signOut();
        }
      });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
