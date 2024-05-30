import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { UserDto } from '../../../Protocol/User/user.dto';
import { UserService } from '../../../Services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { DialogMode } from '../../../Protocol/dialog-mode.enum';
import { DialogService } from '../../../Services/dialog.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private userService: UserService,
  ){}

  displayedColumns=['name', 'email', 'action']
  displayedHeaders=['name', 'email', ]
  users: UserDto[] = [];

  addUser() {
    let newUser = this.userService.getEmptyUser();
    this.openDialog(DialogMode.New, newUser);
  }

  editUser(user: UserDto) {
    this.openDialog(DialogMode.Edit, user);
  }

  openDialog(mode: DialogMode, user: UserDto) {
    const dialogRef = this.dialog.open(UserEditComponent, {
      data: {mode: mode, user: structuredClone(user)},
      width: this.dialogService.width_Medium,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }

  async refreshData() {
    this.users = await firstValueFrom(this.userService.getUsers());
  }

  ngOnInit(): void {
    this.refreshData();
  }
}
