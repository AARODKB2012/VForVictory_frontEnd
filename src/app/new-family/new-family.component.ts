import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FamilyService } from 'app/family.service';
import { FamilyModel } from '../family.model';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-new-family',
  templateUrl: './new-family.component.html',
  styleUrls: ['./new-family.component.css']
})
export class NewFamilyComponent implements OnInit {


  public familyId: number;
  public family: FamilyModel;
  errorInForm: boolean;
  passwordMatch: boolean;
  public editMode: boolean;
  public viewMode: boolean;
  public creationMode: boolean;
  public categoryList: [];
  public profileURL: string = null;
  public familyApproved: boolean;
  private loggedInUser: any;

  constructor(public familyService: FamilyService, public router: Router,private activeRoute: ActivatedRoute) {
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
      this.familyId = params['familyId'];
    });

    
    if (this.familyId) {
      this.familyService.getFamilyById(this.familyId).subscribe((responseData) => {
        console.log(responseData)

        if (responseData) {
          console.log(responseData.results[0])
          this.family = responseData.results[0];
        }

        if (responseData.results[0]['approved_by'] != null){
          this.familyApproved = true;
        }
      });
      
    }

    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser')).email;

   }

  ngOnInit(): void {
    this.familyService.listFamily().subscribe((responseData) => {
      if (responseData) {
        this.categoryList = responseData.results;
      }
    });

  }



  onSave(form: NgForm) {
    if ( form.invalid ) { // Validating form has data
      console.log('returned');
      this.errorInForm = true;
      return;
    }else {
      if (this.creationMode){
      const request: any = {
            first_name: form.value.first_name,
            last_name: form.value.last_name,
            phone_number: form.value.phone_number,
            street_address: form.value.street_address,
            zipcode: form.value.zipcode,
            email: form.value.email,
            cancer_warrior_name: form.value.cancer_warrior_name,
            work_phone: form.value.work_phone,
            relationship_to_warrior: form.value.relationship_to_warrior,
            additional_info: form.value.additional_info,
            end_of_treatment_date: form.value.end_of_treatment_date,
            familysize:form.value.familySize,
            hearabout:form.value.hearAbout,
            welcomeLetter:form.value.welcomeLetter,
            treamentLetter: form.value.treamentLetter,
            subscriberList:form.value.subscriberList,
            facebookGroup:form.value.facebookGroup
        };

      this.familyService.saveFamily(request).subscribe((responseData) => {
        if (responseData.familyCreated) {
          Swal.fire({
            title: "Record Saved Successfully!",
            text: "The family was created successfully.",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success"
          })
          this.router.navigate(['/family']);
        }
    });

    }
    if (this.editMode){
      const family: any = {
        id: this.familyId,
            first_name: form.value.first_name,
            last_name: form.value.last_name,
            phone_number: form.value.phone_number,
            street_address: form.value.street_address,
            zipcode: form.value.zipcode,
            email: form.value.email,
            cancer_warrior_name: form.value.cancer_warrior_name,
            work_phone: form.value.work_phone,
            relationship_to_warrior: form.value.relationship_to_warrior,
            additional_info: form.value.additional_info,
            end_of_treatment_date: form.value.end_of_treatment_date,
            familysize:form.value.familySize,
            hearabout:form.value.hearAbout,
            welcomeLetter:form.value.welcomeLetter,
            treamentLetter: form.value.treamentLetter,
            subscriberList:form.value.subscriberList,
            facebookGroup:form.value.facebookGroup
      };

      console.log('family', family)

      this.familyService.editFamily(family).subscribe((responseData) => {
        if(responseData.familyUpdated) {
          Swal.fire({
            title: 'Record Updated Successfully!',
            text: 'The family was updated successfully.',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success',
            type: 'success'
          })
          this.router.navigate(['/family']);
        }
      });
    }
    }
  }

  approvedFamily(familyId, familyName){
    this.familyService.approveFamily(familyId, this.loggedInUser).subscribe((responseData) => {
      if (responseData.familyApproved) {
        Swal.fire({
          title: 'Family Approved Successfully!',
          text:  familyName + ' was approved successfully.',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          type: 'success'
        })
        this.router.navigate(['/family']);
      }
    });
  }
}
