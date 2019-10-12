import {Component, ViewChild} from '@angular/core';
import {AuthService} from './services/auth.service';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notes';
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  constructor(public auth: AuthService) {
  }

  close() {
    this.sidenav.close();
  }

}
