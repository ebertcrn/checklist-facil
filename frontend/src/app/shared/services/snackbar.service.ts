import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private readonly snackbar: MatSnackBar) {}

  open(message: string) {
    this.snackbar.open(message, '', {
      duration: 2000,
    });
  }
}
