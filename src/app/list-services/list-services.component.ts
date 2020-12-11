import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { ServiceModel } from '../service.model';
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
  styleUrls: ['./list-services.component.css']
})
export class ListServicesComponent implements OnInit {

    public activeList: ServiceModel[];
    public renderedList: ServiceModel[];
    public activeDataTable: DataTable;
    public renderedDataTable: DataTable;

    constructor(public serviceService: ServicesService) {}

    ngOnInit() {
      this.serviceService.listActiveServices().subscribe((activeReturned) => {
        if (activeReturned) {
          this.activeList = activeReturned.results;

          this.activeDataTable = {
            headerRow: [ 'Name', 'Category', 'Business', 'Date Requested', 'Notified Business?', 'Notified Family?'],
            footerRow: [ 'Name', 'Category', 'Business', 'Date Requested', 'Notified Business?', 'Notified Family?'],
            dataRows: this.activeList
          };
         }
      });

      this.serviceService.listRenderedServices().subscribe((renderedReturned) => {
        if (renderedReturned) {
          this.renderedList = renderedReturned.results;

          this.renderedDataTable = {
            headerRow: [ 'Name', 'Category', 'Business', 'Date Requested', 'Date Fulfilled', 'Business Followed Up?', 'Family Followed Up?'],
            footerRow: [  'Name', 'Category', 'Business', 'Date Requested', 'Date Fulfilled', 'Business Followed Up?', 'Family Followed Up?'],
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
      }

    });

    var aTable = $('#activetable').DataTable();

    // Edit record
    aTable.on('click', '.edit', function() {
      let $tr = $(this).closest('tr');

      var data = aTable.row($tr).data();
      alert('Click here to view or edit ' + data[0] + '\'s information.');
    });


    aTable.on('click', '.fulfill', function(e) {
      var c = confirm("Are you sure you wish to mark this request as fulfilled?");
      if(c) {
        var currentRow = $(this).closest('tr');
        var data = aTable.row(currentRow).data();
        this.onFulfill();
      }
    });

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
    }

  });

  var rTable = $('#renderedtable').DataTable();

  // Edit record
  rTable.on('click', '.edit', function() {
    let $tr = $(this).closest('tr');

    var data = rTable.row($tr).data();
    alert('Click here to view or edit ' + data[0] + '\'s information.');
  });
  }

  onFulfill(data = []) {
    const request: any = {
      familyName: data[0],
      dateRequested: data[3]
    }
    this.serviceService.fulfillRequest(request).subscribe((responseData) => {
      if (responseData.requestFulfilled) {
        Swal.fire({
          title: "Request fulfilled!",
          text: "The request has been moved to \"Services Rendered.\"",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          type: "success"
        })
      }
    });
  }
}
