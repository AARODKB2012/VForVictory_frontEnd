import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ServicesService } from '../services.service';
import { BusinessService } from '../business.service';
import { FamilyService } from '../family.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ServiceModel } from 'app/service.model';
import { FamilyModel } from 'app/family.model';

declare interface DataTable {
  headerRow: string[];
  dataRows: string[];
}

declare var $: any;
@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css'],
  providers: [DatePipe]
})
export class RequestServiceComponent implements OnInit {

  public errorInForm: boolean;
  public categoryList: [];
  public serviceList: [];
  public dataTable: DataTable;
  public familyId;
  public family: FamilyModel;
  public requestedServices: any = [];
  public requestList: any = [];
  public note;
  public currentDate = new Date();
  public today;
  public reqCount = 0;
  public addDisable = false;
  public submitDisable = true;
  constructor(public serviceService: ServicesService, public businessService: BusinessService, public familyService: FamilyService, public router: Router, private datePipe: DatePipe, private activeRoute: ActivatedRoute) {
    this.today = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
   }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe(params => {
      this.familyId = params['familyId'];
    });
    if (!this.familyId) {
      this.router.navigate(['/request/login']);
    }
    else {
      this.familyService.getFamilyById(this.familyId).subscribe((responseData) => {
        if(responseData) {
          this.family = responseData.results[0];
          this.family.firstName = responseData.results[0]['first_name'] + ' ' + responseData.results[0]['last_name'];
          this.family.lastName = responseData.results[0]['cancer_warrior_name'];
        }
        else {
          this.router.navigate(['/request/login']);
        }
      })
    }
    this.serviceService.getAllCategories().subscribe((responseData) => {
      if (responseData) {
        this.categoryList = responseData.results;
      }
    });
    this.businessService.getActiveBusinesses().subscribe((responseData) => {

      if (responseData) {
        this.serviceList = responseData.results;
      }
    });

    this.dataTable = {
      headerRow: [ 'Service', 'Notes', 'Delete?'],
      dataRows: this.requestList
    };
  }

  ngAfterViewInit(){
    $('#datatable').DataTable({
      searching: false,
      paging: false,
      info: false,
      "language": {
        "emptyTable": "No services requested."
      },
      bAutoWidth: false,
      aoColumns : [
        { sWidth: '49%' },
        { sWidth: '49%' },
        { sWidth: '2%' },
      ],
    });
    var table = $('#datatable').DataTable();
  }

  onAdd(form: NgForm) {
    if ( form.invalid ) { // Validating form has data
      console.log('returned');
      this.errorInForm = true;
      return;
    }
    else {
      let item;
      item = {serviceId: form.value.req1.id, service: form.value.req1.name, notes: form.value.notes};
      this.requestList.push(item);
      this.note = null;
      this.submitDisable = false;
      this.reqCount++;
      if(this.reqCount >= 8){
        this.addDisable = true;
      }
    }
  }

  onDelete(serviceId) {
    this.requestList.splice(serviceId - 1, 1);
    this.reqCount--;
    if(this.reqCount < 8) {
      this.addDisable = false;
    }
    if(this.reqCount <= 0) {
      this.submitDisable = true;
    }
  }

  onSave(form: NgForm) {
    if ( form.invalid ) { // Validating form has data
      console.log('returned');
      this.errorInForm = true;
      return;
    }
    else {
      Swal.fire({
        title: "Submit request?",
        text: "Please double-check your request before submitting.",
        type: "info",
        showCancelButton: true,
        cancelButtonClass: "btn btn-info",
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Submit it!",
        cancelButtonText: "Go back",
        reverseButtons: true
      })
      .then((fulfill) => {
        if(fulfill.value) {
          for(let i = 0; i < this.requestList.length; i++){
            if(this.requestList[i]['serviceId'] || this.requestList[i]['serviceId'] != "") {
                const request: any = {
                  familyId: this.familyId,
                  businessId: this.requestList[i]['serviceId'],
                  notes: this.requestList[i]['notes']
                };
                this.serviceService.saveRequest(request).subscribe((reqResponseData) => {
                  if (reqResponseData.requestCreated) {
                    this.addDisable = true;
                    this.submitDisable = true;
                    Swal.fire({
                      title: "Request Submitted!",
                      text: "Your request for service was submitted successfully.  Thank you!",
                      buttonsStyling: false,
                      confirmButtonClass: "btn btn-success",
                      type: "success"
                    })
                  }
              });
            }
          }
        }
      });
    }
  }

}
