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

  constructor(public familyService: FamilyService, public router: Router) { }

  ngOnInit(): void {

  }

  public editMode: boolean;
  public viewMode: boolean;
  public creationMode: boolean;
  public categoryList: [];
  public profileURL: string = null;

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
      });
    }
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
    }
    else {
      if (this.creationMode){
      const request: any = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        phoneNumber: form.value.phonenumber,
        streetAddress: form.value.address,
        zipcode: form.value.zipcode,
        email: form.value.email,
        cancerWarriorname: form.value.cancerwarrior,
        workPhone: form.value.workPhone,
        relationshipTowarrior: form.value.relationship,
        additionalInfo: form.value.addInfo,
        endOftreatmentDate: form.value.endOftreatmentDate
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
        }
    });
    } 
          this.router.navigate(['/family']);
        }
    });

    } 
    if (this.editMode){
      const family: any = {
        id: this.familyId,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        phoneNumber: form.value.phonenumber,
        streetAddress: form.value.address,
        zipcode: form.value.zipcode,
        email: form.value.email,
        cancerWarriorname: form.value.cancerwarrior,
        workPhone: form.value.workPhone,
        relationshipTowarrior: form.value.relationship,
        additionalInfo: form.value.addInfo,
        endOftreatmentDate: form.value.endOftreatmentDate
      };

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