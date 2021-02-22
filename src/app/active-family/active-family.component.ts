import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../family.service';
import { FamilyModel } from '../family.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: FamilyModel[];
}

@Component({
  selector: 'app-active-family',
  templateUrl: './active-family.component.html',
  styleUrls: ['./active-family.component.css']
})
export class ActiveFamilyComponent implements OnInit {

  public dataList;
  public dataTable: DataTable;
  public inactiveFamily: FamilyModel[];
  public inactiveFamilyTable: DataTable;


  constructor(public familyService: FamilyService, public router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit(){

    this.familyService.listInactiveFamily().subscribe((returned) => {
      if (returned) {
        this.inactiveFamily = returned.results;
        this.inactiveFamilyTable = {
          headerRow: [ 'Id', 'First Name', 'Last Name', 'Email', 'Address', 'End Of Treatment Date' , 'Options'],
            footerRow: [ 'Id', 'First Name', 'Last Name', 'Email', 'Address', 'End Of Treatment Date', 'Options'],
            dataRows: this.inactiveFamily
        };
       }
    });


  }

ngAfterViewInit(){
  $('#table').DataTable({
    "pagingType": "full_numbers",
    "lengthMenu": [
      [10, 25, 50, -1],
      [10, 25, 50, "All"]
    ],
    responsive: true,
    language: {
      search: "_INPUT_",
      searchPlaceholder: "Search records",
    }

  });
  }
   


    markFamilyActive(itemId) {
      Swal.fire({
        title: "MARK ACTIVE?",
        text: "Would you like to mark this service as active? It will then become selectable by families.",
        type: "warning",
        showCancelButton: true,
        cancelButtonClass: "btn btn-info",
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Yes, mark it!",
        cancelButtonText: "No, leave it!",
        reverseButtons: true
      })
      .then((mark) => {
        if(mark.value) {
          const request: any = {
            id: itemId,
          }
          this.familyService.markFamilyActive(request).subscribe((responseData) => {
            if (responseData.requestFulfilled) {
              Swal.fire({
                title: "Service changed!",
                text: "The service has been made active.",
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

    markFamilyInactive(itemId) {
      Swal.fire({
        title: "MARK INACTIVE?",
        text: "Would you like to mark this service as inactive? It will no longer be selectable by families.",
        type: "warning",
        showCancelButton: true,
        cancelButtonClass: "btn btn-info",
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Yes, mark it!",
        cancelButtonText: "No, leave it!",
        reverseButtons: true
      })
      .then((mark) => {
        if(mark.value) {
          const request: any = {
            id: itemId,
          }
          this.familyService.markFamilyInactive(request).subscribe((responseData) => {
            if (responseData.requestFulfilled) {
              Swal.fire({
                title: "Service changed!",
                text: "The service has been made inactive.",
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