import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { UserDto } from '../../../Protocol/User/user.dto';
import { DialogMode } from '../../../Protocol/dialog-mode.enum';
import { DialogService } from '../../../Services/dialog.service';
import { NgIf } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../../Services/user.service';
import { LoggerService } from '../../../Services/logger.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    NgIf,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: DialogMode, user: UserDto},
    private dialogService: DialogService,
    private logger: LoggerService,
    private userService: UserService,
  ) {}

  newOrEdit: string = '';

  async save() {
    let user = this.data.user;

    if (this.data.mode === DialogMode.New) {
      await firstValueFrom(this.userService.createUser(user));
      this.logger.success('User created');
    }
    else if (this.data.mode === DialogMode.Edit) {
      await firstValueFrom(this.userService.updateUser(user));
    }

    this.dialogRef.close(user);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.newOrEdit = this.dialogService.getNewOrEdit(this.data.mode);
  }
}
