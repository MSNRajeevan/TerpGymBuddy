import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( public afAuth : AngularFireAuth, public router: Router) { }

  ngOnInit(): void {
    this.afAuth.signOut();
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.afAuth.signOut();
  }
}
