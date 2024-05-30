import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private http: HttpClient,
  ) {}

  config: any;

  async loadConfig() {
    let config = await firstValueFrom(
      this.http.get<any>('./assets/config/config.json')
    );
    
    this.config = config;

    return;
  }
}