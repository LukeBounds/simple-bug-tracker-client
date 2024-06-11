import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatDividerModule, MatMenuModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ){
    this.matIconRegistry.addSvgIcon('github-fa', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/github-fa.svg'));
  }

  navToGithub_Client() {
    window.location.href='https://github.com/LukeBounds/simple-bug-tracker-client';
  }
  navToGithub_BackEnd() {
    window.location.href='https://github.com/LukeBounds/simple-bug-tracker-backend';
  }

}
