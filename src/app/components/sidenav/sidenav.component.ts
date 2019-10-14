import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {Note} from '../../models/note.model';
import {Notebook} from '../../models/notebook.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public auth: AuthService, private dataService: DataService) { }
  @Input() user;
  notebooks: Notebook = {
    notes: []
  };

  ngOnInit() {
    this.getUsersNotebooks();
  }

  getUsersNotebooks() {
    this.auth.user$.subscribe(user => {
      this.dataService.getNotebooks(user.uid).subscribe(nbs => {
        nbs.map(actions => {
          let note = {
            title: actions.payload.doc.data().title,
            note: actions.payload.doc.data().note
          } as Note;
          console.log(note);
          this.notebooks.notes.push(note);
        });
      });
    })
  }

}
