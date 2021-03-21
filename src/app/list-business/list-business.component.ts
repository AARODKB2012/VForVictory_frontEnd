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
  public userRole: number;
  constructor(public businessService: BusinessService){
    this.userRole = JSON.parse(localStorage.getItem('currentUser')).role;
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
    })
  };

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

  formatPhoneNumber(phoneNumber: String) {
    if (!phoneNumber) { return ''; }

    var value = phoneNumber.toString().trim().replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
        return phoneNumber;
    }

    var country, city, number;

    switch (value.length) {
        case 10: // +1PPP####### -> C (PPP) ###-####
            country = 1;
            city = value.slice(0, 3);
            number = value.slice(3);
            break;

        case 11: // +CPPP####### -> CCC (PP) ###-####
            country = value[0];
            city = value.slice(1, 4);
            number = value.slice(4);
            break;

        case 12: // +CCCPP####### -> CCC (PP) ###-####
            country = value.slice(0, 3);
            city = value.slice(3, 5);
            number = value.slice(5);
            break;

        default:
            return phoneNumber;
    }

    if (country == 1) {
        country = "";
    }

    number = number.slice(0, 3) + '-' + number.slice(3);

    return (country + " (" + city + ") " + number).trim();
  };
}

