import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'app/business.service';
declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: [];
}
@Component({
  selector: 'app-business-category',
  templateUrl: './business-category.component.html',
  styleUrls: ['./business-category.component.css']
})
export class BusinessCategoryComponent implements OnInit {

  public categoryList: [];
  public dataTable: DataTable;
  public userRole: number;
  constructor(public businessService: BusinessService) {
    this.userRole = JSON.parse(localStorage.getItem('currentUser')).role;
  }

  ngOnInit() {
    this.businessService.getAllCategories().subscribe((responseData) => {
      if (responseData) {
        this.categoryList = responseData.results;
        this.dataTable = {
          headerRow: [ 'Id', 'Name', 'Created By', 'Options'],
          footerRow: [ 'Id', 'Name', 'Created By', 'Options'],
          dataRows: this.categoryList
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
