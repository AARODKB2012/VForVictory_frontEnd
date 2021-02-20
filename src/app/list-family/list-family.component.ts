import { Component, OnInit } from '@angular/core';
import { FamilyService} from '../family.service';
import { FamilyModel } from '../family.model';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

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
  table.on('click', '.edit', function() {
    let $tr = $(this).closest('tr');

    var data = table.row($tr).data();
    alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
  });
}
}
