import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SerialiseService {

  constructor() { }

  serialise(obj: any): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var element = obj[key];
        params.set(key, element);
      }
    }
    return params;
  }
}
