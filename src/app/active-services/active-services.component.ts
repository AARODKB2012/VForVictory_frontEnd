import { Component, OnInit } from '@angular/core';
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
  selector: 'app-active-services',
  templateUrl: './active-services.component.html',
  styleUrls: ['./active-services.component.css']
})
export class ActiveServicesComponent implements OnInit {
  public dataList;
  public dataTable: DataTable;

  constructor(public serviceService: ServicesService, public router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.serviceService.getAllServices().subscribe((returned) => {
      if (returned) {
        this.dataList = returned.results;
        this.dataTable = {
          headerRow: [ 'ID', 'Business Name', 'Category', 'Status'],
          footerRow: [ 'ID', 'Business Name', 'Category', 'Status'],
          dataRows: this.dataList
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

  markServiceActive(itemId) {
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
        this.serviceService.markServiceActive(request).subscribe((responseData) => {
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

  markServiceInactive(itemId) {
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
        this.serviceService.markServiceInactive(request).subscribe((responseData) => {
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
