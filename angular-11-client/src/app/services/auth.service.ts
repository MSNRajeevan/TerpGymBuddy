import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase, { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { User } from '../models/User.model';
// import { filter, switchMap } from 'rxjs/operators';
// import { User } from '../models/User.model';
declare var gapi: any;

@Injectable({ providedIn: 'root' })
export class AuthService {
  [x: string]: any;
  user$: Observable<User | null | undefined>;
  calendarItems: any[] | undefined;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.initClient();
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      }),
      filter((user) => !!user)
    );
  }
  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user: firebase.User | null) {
    // Sets user data to firestore on login
    if (user) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );

      const data = Object.assign({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      return userRef.set(data, {
        merge: true,
      });
    } else {
      console.log('No user is logged in or some issue with authentication');
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  // Initialize the Google API client with desired scopes
  initClient() {
    if (this.user$) {
      gapi.load('client', () => {
        console.log('loaded client');

        // It's OK to expose these credentials, they are client safe.
        gapi.client.init({
          apiKey: 'YOUR_FIREBASE_API_KEY',
          clientId: 'YOUR_OAUTH2_CLIENTID',
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ],
          scope: 'https://www.googleapis.com/auth/calendar',
        });

        gapi.client.load('calendar', 'v3', () =>
          console.log('loaded calendar')
        );
      });
    }

  } //Calnder Services here - this is used to get the next 10 calender events.

  async getCalendar() {
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    });

    console.log(events);

    this.calendarItems = events.result.items;
  } //adding to the calender

  async insertEvent() {
    const insert = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      start: {
        dateTime: this.hoursFromNow(2),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: this.hoursFromNow(3),
        timeZone: 'America/Los_Angeles',
      },
      summary: 'Have Fun!!!',
      description: 'Do some cool stuff and have a fun time doing it',
    });
    await this.getCalendar();
  } // ... helper function
  hoursFromNow = (n: number) =>
    new Date(Date.now() + n * 1000 * 60 * 60).toISOString();
}
