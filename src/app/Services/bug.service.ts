import { Injectable } from '@angular/core';
import { BugPriority } from '../Protocol/Bug/bug-priority.enum';
import { BugDto } from '../Protocol/Bug/bug.dto';
import { UserService } from './user.service';
import { EMPTY, Observable, catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from './config.service';
import { LoggerService } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { CreateBugCommand } from '../Protocol/Bug/create-bug.command';
import { UpdateBugCommand } from '../Protocol/Bug/update-bug.command';
import { CloseBugCommand } from '../Protocol/Bug/close-bug.command';
import { GetBugsQuery } from '../Protocol/Bug/get-bugs.query';
import { SerialiseService } from './serialise.service';
import { GetBugQuery } from '../Protocol/Bug/get-bug.query';
import { DialogMode } from '../Protocol/dialog-mode.enum';
import { MatDialog } from '@angular/material/dialog';
import { BugEditComponent } from '../Components/bugs/bug-edit/bug-edit.component';
import { DialogService } from './dialog.service';
import { BugCloseComponent } from '../Components/bugs/bug-close/bug-close.component';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private configService: ConfigService,
    private serialise: SerialiseService,
    private userService: UserService,
    private dialog: MatDialog,
    private dialogService: DialogService,
  ) { }

  apiUrl: string = this.configService.config.API_URL;

  getNewBug() {
    let newBug: BugDto = { 
      bugId: 0,
      title: '',
      description: '',
      priority: BugPriority.Low,
      assignedUser: this.userService.getEmptyUser(),
      dateCreated: new Date(),
      dateClosed: null,
    }

    return newBug;
  }

  openBugEditDialog(mode: DialogMode, bug: BugDto) {
    const dialogRef = this.dialog.open(BugEditComponent, {
      data: {mode: mode, bug: structuredClone(bug)},
      width: this.dialogService.width_Large,
    });

    return dialogRef;
  }
  openBugCloseDialog(bug: BugDto) {
    const dialogRef = this.dialog.open(BugCloseComponent, {
      data: {bug: structuredClone(bug)},
      width: this.dialogService.width_Medium,
    });

    return dialogRef;
  }

  getOpenBugs(): Observable<BugDto[]> {
    let query: GetBugsQuery = {
      onlyOpen: true,
      onlyClosed: false,
    };

    return this.getBugs(query);
  }
  getClosedBugs(): Observable<BugDto[]> {
    let query: GetBugsQuery = {
      onlyOpen: false,
      onlyClosed: true,
    };

    return this.getBugs(query);
  }

  getBugs(query: GetBugsQuery): Observable<BugDto[]> {
    let url = this.apiUrl + 'bugs';

    let queryString = this.serialise.serialise(query);

    return this.http
      .get<BugDto[]>(url + '?' + queryString)
      .pipe(catchError((error) => this.logger.handleError(error)));
  }

  getBug(bugId: number): Observable<BugDto> {
    let url = this.apiUrl + 'bugs/bug';

    let query: GetBugQuery = {
      bugId: bugId,
    };

    let queryString = this.serialise.serialise(query);

    return this.http
      .get<BugDto>(url + '?' + queryString)
      .pipe(catchError((error) => this.logger.handleError(error)));
  }

  createBug(bug: BugDto): Observable<number> {
    let url = this.apiUrl + 'bugs';

    let command: CreateBugCommand = {
      bug: bug,
    }

    return this.http
      .post<number>(url, command)
      .pipe(catchError((error) => this.logger.handleError(error)));
  }

  updateBug(bug: BugDto): Observable<number> {
    let url = this.apiUrl + 'bugs';

    let command: UpdateBugCommand = {
      bug: bug,
    }

    return this.http
      .put<number>(url, command)
      .pipe(catchError((error) => this.logger.handleError(error)));
  }

  closeBug(bugId: number): Observable<number> {
    let url = this.apiUrl + 'bugs/close';

    let command: CloseBugCommand = {
      bugId: bugId,
    }

    return this.http
      .put<number>(url, command)
      .pipe(catchError((error) => this.logger.handleError(error)));
  }
}
