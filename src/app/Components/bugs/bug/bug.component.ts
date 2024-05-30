import { Component, Input, OnInit, numberAttribute } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { BugDto } from '../../../Protocol/Bug/bug.dto';
import { BugService } from '../../../Services/bug.service';
import { DialogMode } from '../../../Protocol/dialog-mode.enum';
import { firstValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';
import { BugPriorityPipe } from '../../../Pipes/bug-priority.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-bug',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatButtonModule, MatTableModule, DatePipe, BugPriorityPipe],
  templateUrl: './bug.component.html',
  styleUrl: './bug.component.css'
})
export class BugComponent implements OnInit {

  constructor(
    //private activatedRoute: ActivatedRoute,
    private bugService: BugService,
  ){}

  @Input({transform: numberAttribute}) id = 0;
  bug: BugDto | null = null;

  displayedColumns=['headers', 'data', ]
  displayedHeaders=['headers', 'data', ]

  editBug() {
    if (this.bug == null) return;
    
    const dialogRef = this.bugService.openBugEditDialog(DialogMode.Edit, this.bug);

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refreshData();
      }
    });
  }

  closeBug() {
    if (this.bug == null) return;

    const dialogRef = this.bugService.openBugCloseDialog(this.bug);

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refreshData();
      }
    });
  }

  private async refreshData() {
    this.bug = await firstValueFrom(this.bugService.getBug(this.id));
  }

  ngOnInit(): void {
    //this.id = 
    // this.activatedRoute.params.subscribe(result => {
    //   this.id = result['id'];
    // });

    this.refreshData();
  }

}
