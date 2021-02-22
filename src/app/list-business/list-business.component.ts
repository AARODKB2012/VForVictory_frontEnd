import { Component, OnInit } from '@angular/core';
import { BusinessService} from '../business.service';
import { BusinessModel } from '../business.model';

declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: BusinessModel[];
}

@Component({
  selector: 'app-list-business',
  templateUrl: './list-business.component.html',
  styleUrls: ['./list-business.component.css']
})
export class ListBusinessComponent implements OnInit {
  public businessList: BusinessModel[];
  public dataTable: DataTable;
  constructor(public businessService: BusinessService){
  }

    ngOnInit() {
      this.businessService.listBusiness().subscribe((businessReturned) => {
        if (businessReturned) {
          this.businessList = businessReturned.results;
          this.dataTable = {
            headerRow: [ 'Id', 'Name', 'Services Offered', 'Service Area', 'Email', 'Phone Number', 'Preferred Contact' , 'Options'],
            footerRow: [ 'Id', 'Name', 'Services Offered', 'Service Area', 'Email', 'Phone Number', 'Preferred Contact' , 'Options'],
            dataRows: this.businessList
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
  }
}
