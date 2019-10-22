import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {Note} from '../../models/note.model';
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
    this.auth.user$.subscribe(user => {
      this.dataService.getNotes(user.uid).subscribe(notes => {
        notes.forEach(note => {
          let noteObj = {
            id: note.payload.doc.id,
            // @ts-ignore
            title: note.payload.doc.data().title,
            // @ts-ignore
            note: note.payload.doc.data().note,
            uid: user.uid,
          } as Note;
          console.log(noteObj);
          if(this.notes.some(e => e.id === noteObj.id)) {
            this.notes.push(noteObj);
          }
        })
        // notes.map(actions => {
        //         //   let note = {
        //         //     id: actions.payload.doc.id,
        //         //     // @ts-ignore
        //         //     title: actions.payload.doc.data().title,
        //         //     // @ts-ignore
        //         //     note: actions.payload.doc.data().note,
        //         //     uid: user.uid,
        //         //   } as Note;
        //         //   this.notes.push(note);
        //         // });
      });
    })
  }

  addNote() {
    this.dataService.createNote(this.user.uid).then(r => {
      this.router.navigate([`/note/${r.id}`]);
    });
  }

  deleteNote(noteId: string) {
    this.dataService.deleteNote(this.user.uid, noteId);
  }
}
