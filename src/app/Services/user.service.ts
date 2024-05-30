import { Injectable } from '@angular/core';
import { UserDto } from '../Protocol/User/user.dto';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { CreateUserCommand } from '../Protocol/User/create-user.command';
import { UpdateUserCommand } from '../Protocol/User/update-user.command';
import { LoggerService } from './logger.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private configService: ConfigService,
  ) { }

  apiUrl: string = this.configService.config.API_URL;

  getEmptyUser(): UserDto {
    let newUser: UserDto = { 
      userId: 0,
      name: '',
      email: ''
    }

    return newUser;
  }

  compareUsers(x: UserDto, y: UserDto): boolean {
    return x && y ? x.userId === y.userId : x === y;
  }

  getUsers(): Observable<UserDto[]> {
    let url = this.apiUrl + 'users';

    return this.http
      .get<UserDto[]>(url)
      .pipe(catchError((error) => this.logger.handleError(error)));
  }

  createUser(user: UserDto): Observable<number> {
    let url = this.apiUrl + 'users';

    let command: CreateUserCommand = {
      user: user,
    }

    return this.http
      .post<number>(url, command)
      .pipe(catchError((error) => this.logger.handleError(error)));
  }

  updateUser(user: UserDto): Observable<number> {
    let url = this.apiUrl + 'users';

    let command: UpdateUserCommand = {
      user: user,
    }

    return this.http
      .put<number>(url, command)
      .pipe(catchError((error) => this.logger.handleError(error)));
  }



}
