import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {Note} from '../../models/note.model';
import {Notebook} from '../../models/notebook.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public auth: AuthService, private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }
  @Input() user;
  notes:  Note[] = [];

  ngOnInit() {
    this.getUsersNotebook();
  }

  getUsersNotebook() {
    this.notes = [];
    this.auth.user$.subscribe(user => {
      this.dataService.getNotes(user.uid).subscribe(nbs => {
        nbs.map(actions => {
          let note = {
            id: actions.payload.doc.id,
            // @ts-ignore
            title: actions.payload.doc.data().title,
            // @ts-ignore
            note: actions.payload.doc.data().note
          } as Note;
          // console.log(note);
          this.notes.push(note);
        });
      });
    })
  }

  addNote() {
    this.dataService.createNote(this.user.uid).then(r => {
      this.router.navigate([`/note/${r.id}`]);
    });
    this.getUsersNotebook();
  }

  deleteNote(noteId: string) {
    this.dataService.deleteNote(this.user.uid, noteId);
    this.getUsersNotebook();
  }
}
