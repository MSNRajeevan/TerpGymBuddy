import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goals } from '../models/goals.model';

const baseUrl = 'http://localhost:8080/api/goals';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  selectedGoal : any;

  constructor(private http: HttpClient) { }

  getGoals(): Observable<Goals[]> {
    return this.http.get<Goals[]>(baseUrl);
  }
}
