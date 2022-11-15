import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";

import firebase, { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { User } from '../models/User.model';

declare var gapi: any;
var GoogleAuth: { isSignedIn: { listen: (arg0: void) => void; }; currentUser: { get: () => any; }; };
var SCOPE = 'https://www.googleapis.com/auth/calendar';

@Injectable({ providedIn: 'root' })

export class AuthService {
  [x: string]: any;
  user$: Observable<User | null | undefined>;
  calendarItems: any[] | undefined;
  userLoggedin = false;
  emailLoggedinUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.initClient();
    this.user$ = afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          this.emailLoggedinUser = user.email;
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
      this.userLoggedin = true;
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
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    this.userLoggedin = false;
    this.router.navigate(['/']);
  }

  // Initialize the Google API client with desired scopes
  initClient() {

    gapi.load('client:auth2', () => {
      console.log('loaded client')

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: 'AIzaSyBCLIVNhJsE5-ql5hDsDMdhBLqwmxiJufQ',
        clientId: '762869821827-nsrksl20e8dhb0ltuci5i6b6licd26ef.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();
  
        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus());
    });

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar',gapi.client));
      });

  } //Calnder Services here - this is used to get the next 10 calender events.


  async getCalendar() {
    const events = await gapi.client.calendar.events.list({
      calendarId: this.emailLoggedinUser,
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    });


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
function updateSigninStatus() {
  setSigninStatus();
}

function setSigninStatus() {
  var user = GoogleAuth.currentUser.get();
  var isAuthorized = user.hasGrantedScopes(SCOPE);
  if (isAuthorized) {
    $('#sign-in-or-out-button').html('Sign out');
    $('#revoke-access-button').css('display', 'inline-block');
    $('#auth-status').html('You are currently signed in and have granted ' +
        'access to this app.');
  } else {
    $('#sign-in-or-out-button').html('Sign In/Authorize');
    $('#revoke-access-button').css('display', 'none');
    $('#auth-status').html('You have not authorized this app or you are ' +
        'signed out.');
  }
}


