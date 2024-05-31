import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { BugDto } from '../../../Protocol/Bug/bug.dto';
import { BugService } from '../../../Services/bug.service';
import { DialogMode } from '../../../Protocol/dialog-mode.enum';
import { BugPriorityPipe } from '../../../Pipes/bug-priority.pipe';
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, BugPriorityPipe, DatePipe],
  templateUrl: './bugs.component.html',
  styleUrl: './bugs.component.css'
})
export class BugsComponent implements OnInit{

  constructor(
    private bugService: BugService,
  ){}

  displayedColumns_Options: string[] = ['title', 'description', 'priority', 'assignedUser', 'dateCreated', 'dateClosed', 'action']
  displayedColumns: string[] = this.displayedColumns_Options;
  bugs: BugDto[] = [];

  viewOpen: boolean = true;

  viewOpenToggle() {
    this.viewOpen = !this.viewOpen;

    this.refreshData();
    this.setColumnVisibility();
  }

  setColumnVisibility() {
    this.displayedColumns = this.viewOpen ? this.displayedColumns_Options.filter(c => c !== 'dateClosed') : this.displayedColumns_Options;
  }

  newBug() {
    let newBug = this.bugService.getNewBug();

    const dialogRef = this.bugService.openBugEditDialog(DialogMode.New, newBug);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refreshData();
      }
    });
  }

  editBug(bug: BugDto) {
    const dialogRef = this.bugService.openBugEditDialog(DialogMode.Edit, bug);

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refreshData();
      }
    });
  }

  closeBug(bug: BugDto) {
    const dialogRef = this.bugService.openBugCloseDialog(bug);

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refreshData();
      }
    });
  }

  private async refreshData() {
    if (this.viewOpen) {
      this.bugs = await firstValueFrom(this.bugService.getOpenBugs());
    }
    else {
      this.bugs = await firstValueFrom(this.bugService.getClosedBugs());
    }
  }

  ngOnInit(): void {
    this.refreshData();
    this.setColumnVisibility();
  }
}
