import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercises } from '../models/exercises.model';


@Injectable({
  providedIn: 'root'
})

export class ExercisesService {

  
  constructor(private http: HttpClient) { }

  getExerciseByGoalID(goals_id: string): Observable<Exercises[]> {
    return this.http.get<Exercises[]>(`http://localhost:8080/api/exercises/${goals_id}`);
  }
}
