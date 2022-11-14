import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Goals } from 'src/app/models/goals.model';
import { AuthService } from 'src/app/services/auth.service';
import { GoalsService } from 'src/app/services/goals.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isSubmitted = false;
  registrationForm = this.fb.group({
    motive: ['', [Validators.required]],
  });

  goals: Goals[] = [];

  userdetails = this.fb.group({
    weight: ['', [Validators.required]],
    height: ['', [Validators.required]],
  });

  bmi: any;
  suggestion: any;
  bmicalculated = false;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private goalService: GoalsService,
    public router: Router
  ) {}

  ngOnInit(): void {

    this.goalService.getGoals().subscribe((response) => {
      this.goals = response;
    });
    this.bmicalculated = false;
  }

  get motive() {
    return this.registrationForm.get('motive');
  }

  calculateBMI() {
    this.bmicalculated = true;
    const height = this.userdetails.get('height')?.value;
    const weight = this.userdetails.get('weight')?.value;
    this.bmi = 703 * (weight / (height * height));
    // Underweight = <18.5
    // Normal weight = 18.5–24.9
    // Overweight = 25–29.9
    // Obesity = BMI of 30 or greater

    if (this.bmi < 18.5) {
      this.suggestion = 'Underweight';
    } else if (this.bmi > 18.5 && this.bmi < 24.9) {
      this.suggestion = 'Normal weight';
    } else if (this.bmi > 25 && this.bmi < 29.9) {
      this.suggestion = 'Overweight';
    } else if (this.bmi > 30) {
      this.suggestion = 'Obesity';
    } else {
      this.suggestion = 'Sorry! Invalid BMI';
    }
  }
  changeMotive(e: any) {
    this.motive?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    } else {
      this.goalService.selectedGoal = JSON.stringify(
        this.registrationForm.value.motive
      );
      this.router.navigate(["/exercise"]);
    }
  }
}
