import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-maintext',
  templateUrl: './maintext.component.html',
  styleUrls: ['./maintext.component.css']
})
export class MaintextComponent implements OnInit {

  constructor(public auth: AuthService) { }
  title: string;
  note: string;

  noteForm = new FormGroup({
    title: new FormControl(this.title),
    note: new FormControl(this.note),
  });

  ngOnInit() {
  }

}
