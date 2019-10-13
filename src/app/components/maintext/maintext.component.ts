import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-maintext',
  templateUrl: './maintext.component.html',
  styleUrls: ['./maintext.component.css']
})
export class MaintextComponent implements OnInit {

  constructor(public auth: AuthService, private dataService: DataService) {
  }

  title: string;
  note: string;
  users: any[];
  notebooks: any[];

  noteForm = new FormGroup({
    title: new FormControl(this.title),
    note: new FormControl(this.note),
  });

  ngOnInit() {
    this.dataService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
    this.auth.user$.subscribe(user => {
      console.log(user);
      this.dataService.getNotebooks(user.uid).subscribe(notebooks => {
        this.notebooks = notebooks;
        console.log(this.notebooks);
      });
    })
  }
}
