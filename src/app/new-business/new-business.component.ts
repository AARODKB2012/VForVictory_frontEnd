import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BusinessService } from '../business.service';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import Swal from 'sweetalert2';
import { BusinessModel } from '../business.model';
import { rejects } from 'assert';
import { environment } from 'environments/environment';

declare var $: any;
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
  public profileURL: string = null;

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
    if (this.businessId) {
      this.businessService.getBusinessById(this.businessId).subscribe((responseData) => {
        if (responseData) {
          this.business = responseData.results[0];
        }
      });
    }
  }

  ngOnInit(): void {
    this.businessService.getAllCategories().subscribe((responseData) => {
      if (responseData) {
        this.categoryList = responseData.results;
      }
    });
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
          notes: form.value.notes
        };

        this.businessService.createBusiness(business).subscribe((responseData) => {
          if (responseData.businessCreated) {
            Swal.fire({
              title: 'Record Saved Successfully!',
              text: 'The business was created successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              type: 'success'
            })
            this.router.navigate(['/business']);
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
          notes: form.value.notes
        };

        this.businessService.editBusiness(business).subscribe((responseData) => {
          if (responseData.businessUpdated) {
            Swal.fire({
              title: 'Record Updated Successfully!',
              text: 'The business was updated successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              type: 'success'
            })
            this.router.navigate(['/business']);
          }
        });
      }
    }
  }
}
