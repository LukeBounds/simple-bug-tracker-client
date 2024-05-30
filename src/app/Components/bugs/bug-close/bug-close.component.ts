import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { BugService } from '../../../Services/bug.service';
import { BugDto } from '../../../Protocol/Bug/bug.dto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bug-close',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './bug-close.component.html',
  styleUrl: './bug-close.component.css'
})
export class BugCloseComponent {

  constructor(
    public dialogRef: MatDialogRef<BugCloseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {bug: BugDto},
    private bugService: BugService,
  ) {}
  
  cancel(): void {
    this.dialogRef.close();
  }

  async close() {

    let bug = this.data.bug;

    await firstValueFrom(this.bugService.closeBug(bug.bugId));

    this.dialogRef.close(this.data.bug);
  }

}
