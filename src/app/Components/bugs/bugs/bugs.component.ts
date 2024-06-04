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
import { MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSortModule,
    BugPriorityPipe,
    DatePipe
  ],
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

  sortData(sort: Sort) {
    let sortedData: BugDto[] = [];

    const data = this.bugs.slice();
    if (!sort.active || sort.direction === '') {
      sortedData = data;
      return;
    }

    sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'priority':
          return compare(a.priority, b.priority, isAsc);
        case 'assignedUser':
            return compare(a.assignedUser.name, b.assignedUser.name, isAsc);
        case 'dateCreated':
          return compare(a.dateCreated, b.dateCreated, isAsc);
        case 'dateClosed':
            return compare(a.dateClosed ?? distantFuture, b.dateClosed ?? distantFuture, isAsc);
        default:
          return 0;
      }
    });

    this.bugs = sortedData;
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

const distantFuture = new Date(8640000000000000)

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
