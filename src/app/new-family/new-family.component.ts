import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FamilyService } from 'app/family.service';
import { FamilyModel } from '../family.model';
import { NoteModel } from '../note.model'
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { NotesService } from 'app/notes.services';

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
  public familyApproved: boolean;
  private loggedInUser: any;

  constructor(public familyService: FamilyService, public notesService: NotesService, public router: Router, private activeRoute: ActivatedRoute) {
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

        if (responseData.results[0]['approved_by'] != null){
          this.familyApproved = true;
        }
      });
      
    }

    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser')).email;

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
            first_name: form.value.first_name,
            last_name: form.value.last_name,
            phone_number: form.value.phone_number,
            street_address: form.value.street_address,
            zipcode: form.value.zipcode,
            email: form.value.email,
            cancer_warrior_name: form.value.cancer_warrior_name,
            work_phone: form.value.work_phone,
            relationship_to_warrior: form.value.relationship_to_warrior,
            additional_info: form.value.additional_info,
            end_of_treatment_date: form.value.end_of_treatment_date,
            familysize: form.value.familySize,
            hearabout: form.value.hearAbout,
            welcomeLetter: form.value.welcomeLetter,
            treamentLetter: form.value.treamentLetter,
            subscriberList: form.value.subscriberList,
            facebookGroup: form.value.facebookGroup
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
            first_name: form.value.first_name,
            last_name: form.value.last_name,
            phone_number: form.value.phone_number,
            street_address: form.value.street_address,
            zipcode: form.value.zipcode,
            email: form.value.email,
            cancer_warrior_name: form.value.cancer_warrior_name,
            work_phone: form.value.work_phone,
            relationship_to_warrior: form.value.relationship_to_warrior,
            additional_info: form.value.additional_info,
            end_of_treatment_date: form.value.end_of_treatment_date,
            familysize: form.value.familySize,
            hearabout: form.value.hearAbout,
            welcomeLetter: form.value.welcomeLetter,
            treamentLetter: form.value.treamentLetter,
            subscriberList: form.value.subscriberList,
            facebookGroup: form.value.facebookGroup
      };

      console.log('family', family)

      this.familyService.editFamily(family).subscribe((responseData) => {
        if (responseData.familyUpdated) {
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

  approvedFamily(familyId, familyName){
    this.familyService.approveFamily(familyId, this.loggedInUser).subscribe((responseData) => {
      if (responseData.familyApproved) {
        Swal.fire({
          title: 'Family Approved Successfully!',
          text:  familyName + ' was approved successfully.',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          type: 'success'
        })
        this.router.navigate(['/family']);
      }
    });
  }
  saveNote(noteId, currentContent) {
    let noteVal = currentContent;
    if (!noteVal){
      Swal.fire({
        title: "New Note",
        input: 'textarea',
        inputPlaceholder: 'Enter note here...',
        preConfirm: (value) => {
          if (value){
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
        if (fulfill.value) {
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
                if (confirm){
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
          if (value){
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
        if (fulfill.value) {
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
                if (confirm){
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
      if (remove.value) {
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
              if (confirm){
                window.location.reload()
              }
            })
          }
        });
      }
    });
  }

}