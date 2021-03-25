import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { UserProfileComponent } from '../user-profile/user-profile.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  // profileDialog(): void {
  //   this.dialog.open(UserProfileComponent, {
  //     width: '350px',
  //   });
  // }

  /**
   * Logs the user out, removes their data from local storage, and returns them to the welcome view/login screen
   */
  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open("You've been logged out", 'OK', {
      duration: 2000,
    });
  }
}
