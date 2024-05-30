import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogService } from '../../../Services/dialog.service';
import { DialogMode } from '../../../Protocol/dialog-mode.enum';
import { BugDto } from '../../../Protocol/Bug/bug.dto';
import { BugPriority, BugPriorityList } from '../../../Protocol/Bug/bug-priority.enum';
import { UserDto } from '../../../Protocol/User/user.dto';
import {MatSelectModule} from '@angular/material/select';
import { BugPriorityPipe } from '../../../Pipes/bug-priority.pipe';
import { UserService } from '../../../Services/user.service';
import { firstValueFrom } from 'rxjs';
import { BugService } from '../../../Services/bug.service';
import { LoggerService } from '../../../Services/logger.service';

@Component({
  selector: 'app-bug-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    BugPriorityPipe
  ],
  templateUrl: './bug-edit.component.html',
  styleUrl: './bug-edit.component.css'
})
export class BugEditComponent implements OnInit{
  
  constructor(
    public dialogRef: MatDialogRef<BugEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: DialogMode, bug: BugDto},
    private dialogService: DialogService,
    private logger: LoggerService,
    private userService: UserService,
    private bugService: BugService,
  ) {}

  newOrEdit: string = '';

  bugPriorityList = BugPriorityList

  users: UserDto[] = [];

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    priority: new FormControl(BugPriority.Low, [Validators.required]),
    assignedUser: new FormControl<UserDto | null>(null, [Validators.required]),
  });

  compareUsers = this.userService.compareUsers;

  cancel(): void {
    this.dialogRef.close();
  }

  async save() {
    this.mapFormToModel();

    let bug = this.data.bug;

    if (this.data.mode === DialogMode.New) {
      await firstValueFrom(this.bugService.createBug(bug));
      this.logger.success('Bug created');
    }
    else if (this.data.mode === DialogMode.Edit) {
      await firstValueFrom(this.bugService.updateBug(bug));
    }

    this.dialogRef.close(this.data.bug);
  }

  private mapFormToModel() {
    this.data.bug.title = this.form.controls.title.value!;
    this.data.bug.description = this.form.controls.description.value!;
    this.data.bug.priority = this.form.controls.priority.value!;
    this.data.bug.assignedUser = this.form.controls.assignedUser.value!;
  }

  private setUpForm() {
    if (this.data.mode == DialogMode.Edit) {
      this.form.controls.title.setValue(this.data.bug.title);
      this.form.controls.description.setValue(this.data.bug.description);
      this.form.controls.priority.setValue(this.data.bug.priority);
      this.form.controls.assignedUser.setValue(this.data.bug.assignedUser);
    }
  }

  async refreshData() {
    this.users = await firstValueFrom(this.userService.getUsers());
  }
  
  ngOnInit(): void {
    this.newOrEdit = this.dialogService.getNewOrEdit(this.data.mode);

    this.refreshData();

    this.setUpForm();
  }
}
