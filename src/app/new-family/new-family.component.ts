import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FamilyService } from 'app/family.service';
import { FamilyModel } from '../family.model';
import { NotesService } from '../notes.service';
import { NoteModel } from '../note.model'
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';

declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: NoteModel[];
}

@Component({
  selector: 'app-new-family',
  templateUrl: './new-family.component.html',
  styleUrls: ['./new-family.component.css']
})
export class NewFamilyComponent implements OnInit {


  public familyId: number;
  public family: FamilyModel;
  public noteList: NoteModel[];
  public dataTable: DataTable;
  errorInForm: boolean;
  passwordMatch: boolean;
  public editMode: boolean;
  public viewMode: boolean;
  public creationMode: boolean;
  public categoryList: [];
  public profileURL: string = null;

  constructor(public familyService: FamilyService, public notesService: NotesService, public router: Router,private activeRoute: ActivatedRoute) {
    const tree: UrlTree = router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;


    if (s[1].path === 'new') {
      this.creationMode = true;
    }
    if (s[1].path === 'view') {
      this.viewMode = true;
    }
    if (s[1].path === 'edit') {
      this.editMode = true;
    }

    this.activeRoute.queryParams.subscribe(params => {
      this.familyId = params['familyId'];
    });

    if (this.familyId) {
      this.familyService.getFamilyById(this.familyId).subscribe((responseData) => {
        console.log(responseData)

        if (responseData) {
          console.log(responseData.results[0])
          this.family = responseData.results[0];
        }
      });
    }
   }

  ngOnInit(): void {
    this.notesService.getFamilyNotes(this.familyId).subscribe((returned) => {
      if (returned) {
        this.noteList = returned.results;
        this.dataTable = {
          headerRow: [ 'Note', 'Note By', 'Note Date', 'Options'],
          footerRow: [ 'Note', 'Note By', 'Note Date', 'Options'],
          dataRows: this.noteList
        };
      }
      else {
        this.dataTable = {
          headerRow: [ 'Note', 'Note By', 'Note Date', 'Options'],
          footerRow: [ 'Note', 'Note By', 'Note Date', 'Options'],
          dataRows: []
        };
      }
    });
  }
  ngAfterViewInit(){
    $('#datatable').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [5, 10, 20, -1],
        [5, 10, 20, "All"]
      ],
      "order": [[ 2, "desc" ]],
      "oLanguage": {
        "sEmptyTable": "No notes for this family.",
      },
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }

    });

    var table = $('#datatable').DataTable();

    // Edit record

  }


  onSave(form: NgForm) {
    if ( form.invalid ) { // Validating form has data
      console.log('returned');
      this.errorInForm = true;
      return;
    }else {
      if (this.creationMode){
      const request: any = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        phoneNumber: form.value.phonenumber,
        streetAddress: form.value.address,
        zipcode: form.value.zipcode,
        email: form.value.email,
        cancerWarriorname: form.value.cancerwarrior,
        workPhone: form.value.workPhone,
        relationshipTowarrior: form.value.relationship,
        additionalInfo: form.value.addInfo,
        endOftreatmentDate: form.value.endOftreatmentDate
        };

      this.familyService.saveFamily(request).subscribe((responseData) => {
        if (responseData.familyCreated) {
          Swal.fire({
            title: "Record Saved Successfully!",
            text: "The family was created successfully.",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success"
          })
          this.router.navigate(['/family']);
        }
    });

    }
    if (this.editMode){
      const family: any = {
        id: this.familyId,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        phoneNumber: form.value.phonenumber,
        streetAddress: form.value.address,
        zipcode: form.value.zipcode,
        email: form.value.email,
        cancerWarriorname: form.value.cancerwarrior,
        workPhone: form.value.workPhone,
        relationshipTowarrior: form.value.relationship,
        additionalInfo: form.value.addInfo,
        endOftreatmentDate: form.value.endOftreatmentDate
      };

      this.familyService.editFamily(family).subscribe((responseData) => {
        if(responseData.familyUpdated) {
          Swal.fire({
            title: 'Record Updated Successfully!',
            text: 'The family was updated successfully.',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success',
            type: 'success'
          })
          this.router.navigate(['/family']);
        }
      });
    }
    }
  }

  saveNote(noteId, currentContent) {
    let noteVal = currentContent;
    if(!noteVal){
      Swal.fire({
        title: "New Note",
        input: 'textarea',
        inputPlaceholder: 'Enter note here...',
        preConfirm: (value) => {
          if(value){
            noteVal = value;
          }
        },
        type: "info",
        showCancelButton: true,
        cancelButtonClass: "btn btn-info",
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Add note",
        cancelButtonText: "Cancel",
        reverseButtons: true
      })
      .then((fulfill) => {
        if(fulfill.value) {
          let user = JSON.parse(localStorage.getItem('currentUser'));
          const request: any = {
            familyId: this.familyId,
            currentUser: user['email'],
            contents: noteVal
          }
          this.notesService.addNote(request).subscribe((noteData) => {
            if (noteData.noteAdded) {
              Swal.fire({
                title: "Note saved!",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success"
              }).then((confirm) => {
                if(confirm){
                  window.location.reload()
                }
              })
            }
          });
        }
      });
    }
    else {
      Swal.fire({
        title: "Edit Note",
        input: 'textarea',
        inputValue: noteVal,
        inputPlaceholder: 'Enter note here...',
        preConfirm: (value) => {
          if(value){
            noteVal = value;
          }
        },
        type: "info",
        showCancelButton: true,
        cancelButtonClass: "btn btn-info",
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Save changes",
        cancelButtonText: "Cancel",
        reverseButtons: true
      })
      .then((fulfill) => {
        if(fulfill.value) {
          let user = JSON.parse(localStorage.getItem('currentUser'));
          const request: any = {
            id: noteId,
            familyId: this.familyId,
            currentUser: user['email'],
            contents: noteVal
          }
          this.notesService.editNote(request).subscribe((noteData) => {
            if (noteData.noteUpdated) {
              Swal.fire({
                title: "Note updated!",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success"
              }).then((confirm) => {
                if(confirm){
                  window.location.reload()
                }
              })
            }
          });
        }
      });
    }
  }

  deleteNote(noteId) {
    Swal.fire({
      title: "Delete note?",
      type: "error",
      showCancelButton: true,
      cancelButtonClass: "btn btn-info",
      confirmButtonClass: "btn btn-danger",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "No, cancel",
      reverseButtons: true
    })
    .then((remove) => {
      if(remove.value) {
        const request: any = {
          id: noteId,
        }
        this.notesService.deleteNote(request).subscribe((noteData) => {
          if (noteData.noteDeleted) {
            Swal.fire({
              title: "Note deleted.",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-info",
              type: "error"
            }).then((confirm) => {
              if(confirm){
                window.location.reload()
              }
            })
          }
        });
      }
    });
  }
}
