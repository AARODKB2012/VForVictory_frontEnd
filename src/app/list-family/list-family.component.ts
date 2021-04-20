import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../family.service';
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
  public userRole: number;
  private loggedInUser: any;
  public today;
  public url;

  constructor(public familyService: FamilyService) {
    this.userRole = JSON.parse(localStorage.getItem('currentUser')).role;
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser')).email;
  }


  ngOnInit() {
    this.url = window.location.origin;
    this.familyService.listFamily().subscribe((familyReturned) => {
      if (familyReturned) {
        this.familyList = familyReturned.results;
        this.dataTable = {
          headerRow: ['Id', 'First Name', 'Last Name', 'Email', 'Address', 'End Of Treatment Date','Approval Status', 'Options'],
          footerRow: ['Id', 'First Name', 'Last Name', 'Email', 'Address', 'End Of Treatment Date','Approval Status', 'Options'],
          dataRows: this.familyList
        };
      }
      else {
        this.dataTable = {
          headerRow: ['Id', 'First Name', 'Last Name', 'Email', 'Address', 'End Of Treatment Date','Approval Status', 'Options'],
          footerRow: ['Id', 'First Name', 'Last Name', 'Email', 'Address', 'End Of Treatment Date','Approval Status', 'Options'],
          dataRows: []
        };
      }
    });


  }
  ngAfterViewInit() {

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
      },
    });

    var table = $('#datatable').DataTable();



    $('#all').on('click', function () {
      table.search('').columns().search('').draw();
    });

    $('#approved').on('click', function () {
      table.columns(6).search("Approved").draw();
    });
    $('#unapproved').on('click', function () {
      table.columns(6).search("Pending").draw();
    });


  }
  markFamilyInactive(itemId) {
    Swal.fire({
      title: "MARK INACTIVE?",
      text: "Would you like to make this family inactive? It will no longer appear on the active families list.",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "btn btn-info",
      confirmButtonClass: "btn btn-danger",
      confirmButtonText: "Yes, mark it!",
      cancelButtonText: "No, leave it!",
      reverseButtons: true
    })
      .then((mark) => {
        if (mark.value) {
          const request: any = {
            id: itemId,
          }
          this.familyService.markFamilyInactive(request).subscribe((responseData) => {
            if (responseData.requestFulfilled) {
              Swal.fire({
                title: "Family is now inactive.",
                text: "The family has been made inactive, this family will no longer appear on active family list.",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success"
              }).then((confirm) => {
                if (confirm) {
                  window.location.reload()
                }
              })
            }
          });
        }
      });
  }


  showClipboard() {
    Swal.fire({
      title: "Copied!",
      text: "The link to the Family Application form has been successfully copied to your clipboard.",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      type: "success"
    });
  }
}
