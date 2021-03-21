import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ServicesService } from '../services.service';
import { ServiceModel } from '../service.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: ServiceModel[];
}

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css'],
  providers: [DatePipe]
})
export class ListServicesComponent implements OnInit {

    public activeList: ServiceModel[];
    public renderedList: ServiceModel[];
    public activeDataTable: DataTable;
    public renderedDataTable: DataTable;
    public currentDate = new Date();
    public today;
    public url;

    constructor(public serviceService: ServicesService, public router: Router, private activeRoute: ActivatedRoute, private datePipe: DatePipe) {
      this.today = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');}

    ngOnInit() {
      this.url = window.location.origin;

      this.serviceService.listActiveRequests().subscribe((activeReturned) => {
        if (activeReturned) {
          this.activeList = activeReturned.results;
          this.activeDataTable = {
            headerRow: [ 'ID', 'Name', 'Email', 'Business', 'Category', 'Date Requested', 'Notified Business?', 'Notified Family?'],
            footerRow: [ 'ID', 'Name', 'Email', 'Business', 'Category', 'Date Requested', 'Notified Business?', 'Notified Family?'],
            dataRows: this.activeList
          };
         }
      });

      this.serviceService.listRenderedServices().subscribe((renderedReturned) => {
        if (renderedReturned) {
          this.renderedList = renderedReturned.results;
          this.renderedDataTable = {
            headerRow: [ 'ID', 'Name', 'Email', 'Business', 'Category', 'Date Requested', 'Date Fulfilled', 'Business Followed Up?', 'Family Followed Up?'],
            footerRow: [  'ID', 'Name', 'Email', 'Business', 'Category', 'Date Requested', 'Date Fulfilled', 'Business Followed Up?', 'Family Followed Up?'],
            dataRows: this.renderedList
          };
         }
      });
  }

  ngAfterViewInit(){

    $('#activetable').DataTable({
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

    var aTable = $('#activetable').DataTable();

  $('#renderedtable').DataTable({

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
    bAutoWidth: false,
    aoColumns : [
      { sWidth: '2%' },
      { sWidth: '10%' },
      { sWidth: '10%' },
      { sWidth: '10%' },
      { sWidth: '10%' },
      { sWidth: '10%' },
      { sWidth: '10%' },
      { sWidth: '5%' },
      { sWidth: '5%' },
      { sWidth: '20%' }
    ],
  });

  var rTable = $('#renderedtable').DataTable();

  }

  fulfillRequest(itemId) {
    Swal.fire({
      title: "Are you sure you wish to mark this request as fulfilled?",
      text: "It will be moved to the Services Rendered table.",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "btn btn-info",
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Yes, move it!",
      cancelButtonText: "No, leave it!",
      reverseButtons: true
    })
    .then((fulfill) => {
      if(fulfill.value) {
        const request: any = {
          id: itemId,
          dateFulfilled: this.today
        }
        this.serviceService.fulfillRequest(request).subscribe((responseData) => {
          if (responseData.requestFulfilled) {
            Swal.fire({
              title: "Request fulfilled!",
              text: "The request has been moved to Services Rendered.",
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

  markBusinessNotified(itemId) {
    Swal.fire({
      title: "Has this business been notified?",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "btn btn-info",
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Yes, mark it!",
      cancelButtonText: "Not yet, leave it!",
      reverseButtons: true
    })
    .then((notify) => {
      if(notify.value) {
        const request: any = {
          id: itemId,
        }
        this.serviceService.markBusinessNotified(request).subscribe((responseData) => {
          if (responseData.requestFulfilled) {
            Swal.fire({
              title: "Changes saved!",
              text: "The service request has been modified.",
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

  markFamilyNotified(itemId) {
    Swal.fire({
      title: "Has this family been notified?",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "btn btn-info",
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Yes, mark it!",
      cancelButtonText: "Not yet, leave it!",
      reverseButtons: true
    })
    .then((notify) => {
      if(notify.value) {
        const request: any = {
          id: itemId,
        }
        this.serviceService.markFamilyNotified(request).subscribe((responseData) => {
          if (responseData.requestFulfilled) {
            Swal.fire({
              title: "Changes saved!",
              text: "The service request has been modified.",
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

  markBusinessFollowedUp(itemId) {
    Swal.fire({
      title: "Has this business been followed up with?",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "btn btn-info",
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Yes, mark it!",
      cancelButtonText: "Not yet, leave it!",
      reverseButtons: true
    })
    .then((notify) => {
      if(notify.value) {
        const request: any = {
          id: itemId,
        }
        this.serviceService.markBusinessFollowedUp(request).subscribe((responseData) => {
          if (responseData.requestFulfilled) {
            Swal.fire({
              title: "Changes saved!",
              text: "The rendered service has been modified.",
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

  markFamilyFollowedUp(itemId) {
    Swal.fire({
      title: "Has this family been followed up with?",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "btn btn-info",
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Yes, mark it!",
      cancelButtonText: "Not yet, leave it!",
      reverseButtons: true
    })
    .then((notify) => {
      if(notify.value) {
        const request: any = {
          id: itemId,
        }
        this.serviceService.markFamilyFollowedUp(request).subscribe((responseData) => {
          if (responseData.requestFulfilled) {
            Swal.fire({
              title: "Changes saved!",
              text: "The rendered service has been modified.",
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

  deleteRequest(itemId) {
    Swal.fire({
      title: "DELETE SERVICE REQUEST?",
      text: "Would you like to permanently delete this request? This cannot be undone!",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "btn btn-info",
      confirmButtonClass: "btn btn-danger",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, leave it!",
      reverseButtons: true
    })
    .then((mark) => {
      if(mark.value) {
        Swal.fire({
          title: "ARE YOU SURE?",
          text: "Once it has been deleted, it cannot be recovered!",
          type: "warning",
          showCancelButton: true,
          cancelButtonClass: "btn btn-info",
          confirmButtonClass: "btn btn-danger",
          confirmButtonText: "Yes, remove it!",
          cancelButtonText: "No, leave it!",
        })
        .then((doublemark) => {
          if(doublemark.value) {
            const request: any = {
              id: itemId,
            }
            this.serviceService.deleteRequest(request).subscribe((responseData) => {
              if (responseData.requestFulfilled) {
                Swal.fire({
                  title: "Request removed!",
                  text: "The service request has been deleted.",
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
        })
      }
      })
  }

  showClipboard(){
    Swal.fire({
      title: "Copied!",
      text: "The link to the Service Request form has been successfully copied to your clipboard.",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      type: "success"
      })

  }

  showNote(note) {
    Swal.fire({
      title: "Note from the Family",
      text: note,
      confirmButtonClass: "btn btn-success",
    })
  }
}