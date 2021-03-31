import { Component, OnInit } from '@angular/core';
import { BusinessService} from '../business.service';
import { BusinessModel } from '../business.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  public url: string;
  private loggedInUser: any;

  constructor(public businessService: BusinessService, public router: Router){
    this.userRole = JSON.parse(localStorage.getItem('currentUser')).role;
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser')).email;
  }

  ngOnInit() {
      this.url = window.location.origin;
      this.businessService.listBusiness().subscribe((businessReturned) => {
        if (businessReturned) {
          this.businessList = businessReturned.results;
          this.dataTable = {
            headerRow: [ 'Id', 'Name',  'Services Offered', 'Service Area', 'Email', 'Phone Number', 'Preferred Contact' , 'Active', 'Options'],
            footerRow: [ 'Id', 'Name', 'Services Offered', 'Service Area', 'Email', 'Phone Number', 'Preferred Contact' ,'Active', 'Options'],
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

  showClipboard(){
    Swal.fire({
      title: "Copied!",
      text: "The link to the Business Sign Up form has been successfully copied to your clipboard.",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      type: "success"
    });
  }

  disableBusiness(businessId, businessName){
    Swal.fire({
      title: 'Are you sure?',
      text: "This business will not be visible for requests if disabled.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Yes, disable it!',
       buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.businessService.disableBusiness(businessId, this.loggedInUser).subscribe((responseData) => {
          if (responseData.businessDisabled) {
            this.businessService.listBusiness().subscribe((businessReturned) => {
              if (businessReturned) {
                this.businessList = businessReturned.results;
                this.dataTable = {
                  headerRow: [ 'Id', 'Name',  'Services Offered', 'Service Area', 'Email', 'Phone Number', 'Preferred Contact' , 'Active', 'Options'],
                  footerRow: [ 'Id', 'Name', 'Services Offered', 'Service Area', 'Email', 'Phone Number', 'Preferred Contact' ,'Active', 'Options'],
                  dataRows: this.businessList
                };
              }
            })
            Swal.fire({
              title: 'Business Disabled Successfully!',
              text:  businessName + ' was disabled successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              type: 'success'
            });
          }
        });
      }
    })
  }
}

