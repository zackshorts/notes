import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Note} from '../../models/note.model';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-maintext',
  templateUrl: './maintext.component.html',
  styleUrls: ['./maintext.component.css']
})
export class MaintextComponent implements OnInit {

  constructor(public auth: AuthService, private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {
    if(this.router.url === "/") this.emptyNote = true;
  }
  emptyNote: boolean = false;
  note: Note = {
    id: "",
    title: "",
    note: ""
  };

  noteForm = new FormGroup({
    title: new FormControl(this.note.title),
    note: new FormControl(this.note.note),
  });

  ngOnInit() {
    this.getNoteData();
  }

  private updateNotebook() {
    this.activatedRoute.params.subscribe(params => {
      let notebookId = params['id'];
      this.auth.user$.subscribe(user => {
        this.dataService.updateNote(user.uid, notebookId, this.noteForm.get('title').value, this.noteForm.get('note').value);
      });
    });
  }

  private getNoteData() {
    this.activatedRoute.params.subscribe(params => {
      let notebookId = params['id'];
      this.auth.user$.subscribe(user => {
        this.dataService.getNotes(user.uid).subscribe(nbs => {
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

  onKeyDown($event): void {
    // Detect platform
    if(navigator.platform.match('Mac')){
      this.handleMacKeyEvents($event);
    }
    else {
      this.handleWindowsKeyEvents($event);
    }

  }

  handleMacKeyEvents($event) {
    // MetaKey documentation
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey
    let charCode = String.fromCharCode($event.which).toLowerCase();
    if ($event.metaKey && charCode === 's') {
      // Action on Cmd + S
      console.log('MAC SAVE');
      this.updateNotebook();
      $event.preventDefault();
      this.snackBar.open('Note saved succesfully!', "Dismiss",{
        duration: 2000,
        panelClass: 'center'
      });
    }
  }

  handleWindowsKeyEvents($event) {
    let charCode = String.fromCharCode($event.which).toLowerCase();
    if ($event.ctrlKey && charCode === 's') {
      // Action on Ctrl + S
      console.log('WINDOWS SAVE');
      this.updateNotebook();
      $event.preventDefault();
      this.snackBar.open('Note saved succesfully!', "Dismiss",{
        duration: 2000,
        panelClass: 'center'
      });
    }
  }
}
