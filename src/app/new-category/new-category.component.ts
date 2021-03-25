import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BusinessService } from 'app/business.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public errorInForm: Boolean;
  private loggedInUser: any;
  public viewMode: boolean;
  public editMode: boolean;
  public creationMode: boolean;
  private categoryId: number;
  public category: any;

  constructor(public businessService: BusinessService, public router: Router, private activeRoute: ActivatedRoute) {
    const tree: UrlTree = router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    console.log(s[2].path)
    if (s[2].path === 'new') {
      this.creationMode = true;
    }
    if (s[2].path === 'view') {
      this.viewMode = true;
    }
    if (s[2].path === 'edit') {
      this.editMode = true;
    }

    this.activeRoute.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
    });
    if (this.categoryId) {
      this.businessService.getCategoryById(this.categoryId).subscribe((responseData) => {
        if (responseData) {
          this.category = responseData.results[0];
        }
      });
    }

    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser')).email;
  }

  ngOnInit(): void {
  }

  onSave(form: NgForm) {
    if ( form.invalid ) {
      console.log('returned');
      this.errorInForm = true;
      return;
    } else {
      if(this.creationMode){
        const category: any = {
          categoryName: form.value.categoryName,
          createdBy: this.loggedInUser,
        };

        this.businessService.createCategory(category).subscribe((responseData) => {
          if (responseData.categoryCreated) {
            Swal.fire({
              title: 'Record Created Successfully!',
              text: 'The category was created successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              type: 'success'
            })
            this.router.navigate(['/business/category']);
          }
        });
      }
      if(this.editMode){
        
        const category: any = {
          id: this.categoryId,
          categoryName: form.value.categoryName,
          updatedBy: this.loggedInUser,
        };

        this.businessService.updateCategory(category).subscribe((responseData) => {
          if (responseData.categoryUpdated) {
            Swal.fire({
              title: 'Record Updated Successfully!',
              text: 'The category was updated successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success',
              type: 'success'
            })
            this.router.navigate(['/business/category']);
          }
        });
      }
    }
  }

}
