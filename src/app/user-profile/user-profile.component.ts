import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';
import {
  GetUserService,
  GetAllMoviesService,
  DeleteFavoriteMovieService,
  DeleteUserService,
} from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favorites: any = [];

  constructor(
    public fetchApiData: GetUserService,
    public fetchApiData2: GetAllMoviesService,
    public fetchApiData3: DeleteFavoriteMovieService,
    public fetchApiData4: DeleteUserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.getMovies();
    });
  }

  /**
   * Returns a list of all movies from the database and calls the filterFavorites() function
   */
  getMovies(): void {
    this.fetchApiData2.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavorites();
    });
  }

  /**
   * Filters the list of all movies into an array that matches user favorites
   *
   */
  filterFavorites(): void {
    this.favorites = this.movies.filter((movie: any) =>
      this.user.FavoriteMovies.includes(movie._id)
    );
    return this.favorites;
  }

  removeFromFavorites(id: string, title: string): void {
    this.fetchApiData3.deleteFavoriteMovie().subscribe(() => {
      this.snackBar.open(
        `${title} has been removed from your Favorites`,
        'OK',
        {
          duration: 2000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

  /**
   * This will ask the user to confirm that they want to delete their profile.  If they click "confirm" their profile will be deleted and they will be returned to the welcome view.  If they click "cancel" the alert disappears and the window is reloaded.
   */
  deleteProfile(): void {
    let ok = confirm('Are you sure you want to delete your profile?');
    if (ok) {
      this.fetchApiData4.deleteUser().subscribe(() => {
        console.log('Profile Deleted');
        localStorage.clear();
        this.router.navigate(['welcome']); // routes to the 'welcome' view
        this.snackBar.open('Profile Deleted', 'OK', {
          duration: 2000,
        });
      });
    } else {
      window.location.reload();
    }
  }

  profileUpdateDialog(): void {
    this.dialog.open(ProfileUpdateComponent, {
      width: '280px',
    });
  }
}
