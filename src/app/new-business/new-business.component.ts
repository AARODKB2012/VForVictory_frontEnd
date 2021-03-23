import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BusinessService } from '../business.service';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import Swal from 'sweetalert2';
import { BusinessModel } from '../business.model';
import { rejects } from 'assert';
import { environment } from 'environments/environment';

declare const $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[];
}

@Component({
  selector: 'app-new-business',
  templateUrl: './new-business.component.html',
  styleUrls: ['./new-business.component.css']
})
export class NewBusinessComponent implements OnInit {

  public businessId: number;
  public business: BusinessModel;
  errorInForm: boolean;
  businessnameInUse: boolean;
  public viewMode: boolean;
  public editMode: boolean;
  public creationMode: boolean;
  public categoryList: [];
  public fileToUpload: File = null;
  public profileURL: string = null;
  private loggedInUser: any;
  public dataTableServicesRendered: DataTable;
  public servicesRendered: Array<any>;
  public businessApproved: boolean;

  constructor(public businessService: BusinessService, public router: Router, private activeRoute: ActivatedRoute) {
    const tree: UrlTree = router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;

    if (s[1].path === 'new') {
      this.creationMode = true;
    }
    if (s[1].path === 'view') {
      this.viewMode = true;
    }
    if (s[1].path === 'edit') {
      this.editMode = true;
    }

    this.activeRoute.queryParams.subscribe(params => {
      this.businessId = params['businessId'];
    });

    this.businessService.getAllCategories().subscribe((responseData) => {
      if (responseData) {
        this.categoryList = responseData.results;
      }
    });

    if (this.businessId) {
      this.businessService.getBusinessById(this.businessId).subscribe((responseData) => {
        if (responseData) {
          this.business = responseData.results[0];
          if (responseData.results[0]['profile_picture_url'] != null){
            this.profileURL = environment.backendURL + `api/business/name/${responseData.results[0]['business_name']}/logo`
          }

          if (responseData.results[0]['approved_by'] != null){
            this.businessApproved = true;
          }

          this.businessService.getServicesRendered(this.business['business_name']).subscribe((requests) => {
            if (requests) {
              this.servicesRendered = requests.results;
              this.dataTableServicesRendered = {
                headerRow: [ 'ID', 'Name', 'Date Requested', 'Date Fulfilled', 'Pending'],
                footerRow: [ 'ID', 'Name', 'Date Requested', 'Date Fulfilled', 'Pending'],
                dataRows: this.servicesRendered
              };
            }
          });
        }
      });
    }
    
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser')).email;
  }

  ngOnInit() {

  }

  ngAfterViewInit(){
    
    $('#servicesRendered').DataTable({
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
    var servicesRendered = $('#servicesRendered').DataTable();
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    //console.log(this.fileToUpload);
  }

  onSave(form: NgForm) {
    if ( form.invalid ) {
      console.log('returned');
      this.errorInForm = true;
      return;
    } else {
      if (this.creationMode) { // Creating New Record
        const business: any = {
          businessName: form.value.businessName,
          email: form.value.email,
          pContactFName: form.value.pContactFName,
          pContactLName: form.value.pContactLName,
          pContactPNum: form.value.pContactPNum,
          sContactFName: form.value.sContactFName,
          sContactLname: form.value.sContactLname,
          sContactPNum: form.value.sContactPNum,
          address: form.value.address,
          category: form.value.category,
          serviceArea: form.value.serviceArea,
          discountAmount: form.value.discountAmount,
          preferredContact: form.value.preferredContact,
          eoyReceipt: form.value.eoyReceipt,
          notes: form.value.notes,
          facebookUrl: form.value.facebook,
          twitterUrl: form.value.twitter,
          instagramUrl: form.value.instagram,
          createdBy: this.loggedInUser
        };

        this.businessService.createBusiness(business).subscribe((responseData) => {
          if (responseData.businessCreated) {
            if (this.fileToUpload!=null){
              this.businessService.updateProfilePicture(this.fileToUpload, form.value.businessName).subscribe((responseData) => {
                if (responseData.businessUpdated) {
                  console.log("Business updated");
                }
              });
            }
            Swal.fire({
              title: 'Record Saved Successfully!',
              text: 'The business was created successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              type: 'success'
            })
            this.router.navigate(['/business/list']);
          }
        });

      }

      if (this.editMode) { // Editing Existing Record
        const business: any = {
          id: this.businessId,
          businessName: form.value.businessName,
          email: form.value.email,
          pContactFName: form.value.pContactFName,
          pContactLName: form.value.pContactLName,
          pContactPNum: form.value.pContactPNum,
          sContactFName: form.value.sContactFName,
          sContactLname: form.value.sContactLname,
          sContactPNum: form.value.sContactPNum,
          address: form.value.address,
          category: form.value.category,
          serviceArea: form.value.serviceArea,
          discountAmount: form.value.discountAmount,
          preferredContact: form.value.preferredContact,
          eoyReceipt: form.value.eoyReceipt,
          notes: form.value.notes,
          facebookUrl: form.value.facebook,
          twitterUrl: form.value.twitter,
          instagramUrl: form.value.instagram,
          updatedBy: this.loggedInUser
        };

        this.businessService.editBusiness(business).subscribe((responseData) => {
          if (responseData.businessUpdated) {
            if (this.fileToUpload!=null){
              this.businessService.updateProfilePicture(this.fileToUpload, form.value.businessName).subscribe((responseData) => {
                if (responseData.businessUpdated) {
                  console.log("Business updated");
                }
              });
            }
            Swal.fire({
              title: 'Record Updated Successfully!',
              text: 'The business was updated successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              type: 'success'
            })
            this.router.navigate(['/business/list']);
          }
        });
      }
    }
  }

  approvedBusiness(businessId, businessName){
    this.businessService.approveBusiness(businessId, this.loggedInUser).subscribe((responseData) => {
      if (responseData.businessApproved) {
        Swal.fire({
          title: 'Business Approved Successfully!',
          text:  businessName + ' was approved successfully.',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          type: 'success'
        })
        this.router.navigate(['/business/list']);
      }
    });
  }
}
