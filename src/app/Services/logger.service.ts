import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  handleError(error: HttpErrorResponse) {

    console.error(error);

    let errorMessage = (typeof error.error == 'string') ? error.error : error.status + ' ' + error.statusText;
    this.error(errorMessage);
    
    return EMPTY;
  }

  error(message: string) {
    const config= new MatSnackBarConfig();
    config.panelClass = ['snackbar-error'];
    config.duration = 5000;

    console.error(message);
    this.snackBar.open(message, 'Close', config);
  }

  success(message: string) {
    const config= new MatSnackBarConfig();
    config.panelClass = ['snackbar-success'];
    config.duration = 5000;

    console.info(message);
    this.snackBar.open(message, 'Ok', config);
  }


}
