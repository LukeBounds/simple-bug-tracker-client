import { Injectable } from '@angular/core';
import { DialogMode } from '../Protocol/dialog-mode.enum';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  width_Medium = '500px';
  width_Large = '800px';

  getNewOrEdit(mode: DialogMode) {
    if (mode == DialogMode.New) {
      return 'New';
    }
    else if (mode == DialogMode.Edit) {
      return 'Edit';
    }
    else {
      return '';
    }
  }
}
