import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {Note} from '../../models/note.model';

@Component({
  selector: 'app-maintext',
  templateUrl: './maintext.component.html',
  styleUrls: ['./maintext.component.css']
})
export class MaintextComponent implements OnInit {

  constructor(public auth: AuthService, private dataService: DataService, private activatedRoute: ActivatedRoute) {
  }

  note: Note = {
    id: "",
    title: "",
    note: ""
  };
  title: string;
  // note: string;

  noteForm = new FormGroup({
    title: new FormControl(this.title),
    note: new FormControl(this.note),
  });

  ngOnInit() {
    this.getNoteData();
  }

  private getNoteData() {
    this.activatedRoute.params.subscribe(params => {
      let notebookId = params['id'];
      this.auth.user$.subscribe(user => {
        this.dataService.getNotebooks(user.uid).subscribe(nbs => {
          nbs.map(element => {
            if (element.payload.doc.id === notebookId) {
              // @ts-ignore
              this.note.title = element.payload.doc.data().title;
              // @ts-ignore
              this.note.note = element.payload.doc.data().note;
              this.note.id = notebookId;
            }
          });
        });
      });
    });
  }
}
