import { Component, OnInit } from '@angular/core';
import { FamilyService} from '../family.service';
import { FamilyModel } from '../family.model';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: FamilyModel[];
}

@Component({
  selector: 'app-list-family',
  templateUrl: './list-family.component.html',
  styleUrls: ['./list-family.component.css'],
  providers: [DatePipe]
})
export class ListFamilyComponent implements OnInit {
  public familyList: FamilyModel[];
  public dataTable: DataTable;
  public currentDate = new Date();
  public today;
  public url;
  constructor(public familyService: FamilyService){
  }
  

    ngOnInit() {

      
      this.familyService.listFamily().subscribe((familyReturned) => {
        if (familyReturned) {
          this.familyList = familyReturned.results;
          this.dataTable = {
            headerRow: [ 'Id', 'First Name', 'Last Name', 'Email', 'Address', 'End Of Treatment Date' , 'Options'],
            footerRow: [ 'Id', 'First Name', 'Last Name', 'Email', 'Address', 'End Of Treatment Date', 'Options'],
            dataRows: this.familyList
      };
    }
  });
}
ngAfterViewInit(){
  $('#datatable').DataTable({
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

  var table = $('#datatable').DataTable();

  // Edit record

  
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
