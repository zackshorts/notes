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

  noteForm = new FormGroup({
    title: new FormControl(this.title),
    note: new FormControl(this.note),
  });

  ngOnInit() {
    // this.dataService.getUsers().subscribe(data => {
    //   data.map(actions => {
    //     console.log(actions.payload.doc.data());
    //     console.log(actions.payload.doc.id);
    //     });
    //   });

    // this.auth.user$.subscribe(user => {
    //   this.dataService.getNotebooks(user.uid).subscribe(notebooks => {
    //       notebooks.map(actions => {
    //         console.log(actions.payload.doc.data());
    //         console.log(actions.payload.doc.id);
    //       })
    //   });
    // })
  }
}
