import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Schedules } from '../models/schedules.model';

const baseUrl = 'http://localhost:8080/api/schedules';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  updateFailed: boolean = false;
  finalUpdate : any;

  constructor(private http: HttpClient , private _snackBar: MatSnackBar) { }

  getSchedules(): Observable<Schedules[]> {
    return this.http.get<Schedules[]>(baseUrl);
  }

  updateBooking(schedule_id : any): Observable<Schedules> {
    return this.http.put<Schedules>(`http://localhost:8080/api/schedules/${schedule_id}` , schedule_id)
  }
}
