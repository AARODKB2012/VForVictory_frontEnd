import { BusinessService } from '../business.service';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import Swal from 'sweetalert2';
import { BusinessModel } from '../business.model';
import { rejects } from 'assert';
import { environment } from 'environments/environment';
import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';

declare var swal:any;
declare var $:any;

@Component({
  selector: 'app-business-signup',
  templateUrl: './business-signup.component.html',
  styleUrls: ['./business-signup.component.css']
})
export class BusinessSignupComponent implements OnInit {
  public categoryList: [];
  public errorInForm: boolean;
  public fileToUpload: File = null;
  public disableSubmit: boolean;

  constructor(public businessService: BusinessService, public router: Router, private activeRoute: ActivatedRoute) {
    this.disableSubmit = false;
    this.businessService.getAllCategories().subscribe((responseData) => {
      if (responseData) {
        this.categoryList = responseData.results;
      }
    });
  }

  focus;
  focus1;
  focus2;

  onFinishWizard(){
      //here you can do something, sent the form to server via ajax and show a success message with swal
      swal("Good job!", "Your business was saved successfully!", "success");
  }
  ngOnInit(){

    setTimeout(function() {
      $('.card.card-wizard').addClass('active');
    }, 600);
    if ($(".selectpicker").length != 0) {
      $(".selectpicker").selectpicker({
        iconBase: "nc-icon",
        tickIcon: "nc-check-2"
      });
    }
      // Code for the Validator
      const $validator = $('.card-wizard form').validate({
          rules: {
              firstname: {
                  required: true,
                  minlength: 3
              },
              lastname: {
                  required: true,
                  minlength: 3
              },
              email: {
                  required: true,
                  minlength: 3,
              }
          },

          highlight: function(element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
          },
          success: function(element) {
            $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
          },
          errorPlacement : function(error, element) {
            $(element).append(error);
          }
      });
      // Wizard Initialization
      $('.card-wizard').bootstrapWizard({
          'tabClass': 'nav nav-pills',
          'nextSelector': '.btn-next',
          'previousSelector': '.btn-previous',

          onNext: function(tab, navigation, index) {
              var $valid = $('.card-wizard form').valid();
              if(!$valid) {
                  $validator.focusInvalid();
                  return false;
              }
          },


          onInit: function(tab: any, navigation: any, index: any){

            // check number of tabs and fill the entire row
            let $total = navigation.find('li').length;
            let $wizard = navigation.closest('.card-wizard');

            let $first_li = navigation.find('li:first-child a').html();
            let $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
            $('.card-wizard .wizard-navigation').append($moving_div);

            $total = $wizard.find('.nav li').length;
            let  $li_width = 100/$total;

            let total_steps = $wizard.find('.nav li').length;
            let move_distance = $wizard.width() / total_steps;
            let index_temp = index;
            let vertical_level = 0;

            let mobile_device = $(document).width() < 600 && $total > 3;

            if(mobile_device){
                move_distance = $wizard.width() / 2;
                index_temp = index % 2;
                $li_width = 50;
            }

            $wizard.find('.nav li').css('width',$li_width + '%');

            let step_width = move_distance;
            move_distance = move_distance * index_temp;

            let $current = index + 1;

            if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                move_distance -= 8;
            } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                move_distance += 8;
            }

            if(mobile_device){
                let x: any = index / 2;
                vertical_level = parseInt(x);
                vertical_level = vertical_level * 38;
            }

            $wizard.find('.moving-tab').css('width', step_width);
            $('.moving-tab').css({
                'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

            });
            $('.moving-tab').css('transition','transform 0s');
          },

          onTabClick : function(tab: any, navigation: any, index: any){

              const $valid = $('.card-wizard form').valid();

              if (!$valid) {
                  return false;
              } else {
                  return true;
              }
          },

        onTabShow: function(tab: any, navigation: any, index: any) {
          var $total = navigation.find('li').length;
          var $current = index + 1;

          var $wizard = navigation.closest('.card-wizard');

          // If it's the last tab then hide the last button and show the finish instead
          if ($current >= $total) {
            $($wizard).find('.btn-next').hide();
            $($wizard).find('.btn-finish').show();
          } else {
            $($wizard).find('.btn-next').show();
            $($wizard).find('.btn-finish').hide();
          }

          let button_text = navigation.find('li:nth-child(' + $current + ') a').html();

          setTimeout(function() {
            $('.moving-tab').html(button_text);
          }, 150);

          var checkbox = $('.footer-checkbox');

          if (index == 0) {
            $(checkbox).css({
              'opacity': '0',
              'visibility': 'hidden',
              'position': 'absolute'
            });
          } else {
            $(checkbox).css({
              'opacity': '1',
              'visibility': 'visible'
            });
          }

          $total = $wizard.find('.nav li').length;
          let $li_width = 100 / $total;

          let total_steps = $wizard.find('.nav li').length;
          let move_distance = $wizard.width() / total_steps;
          let index_temp = index;
          let vertical_level = 0;

          let mobile_device = $(document).width() < 600 && $total > 3;

          if (mobile_device) {
            move_distance = $wizard.width() / 2;
            index_temp = index % 2;
            $li_width = 50;
          }

          $wizard.find('.nav li').css('width', $li_width + '%');

          let step_width = move_distance;
          move_distance = move_distance * index_temp;

          $current = index + 1;

          // if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
          //     move_distance -= 8;
          // } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
          //     move_distance += 8;
          // }

          if(mobile_device){
              let x: any = index / 2;
              vertical_level = parseInt(x);
              vertical_level = vertical_level * 38;
          }

          $wizard.find('.moving-tab').css('width', step_width);
          $('.moving-tab').css({
            'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
            'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

          });
        }
      });

      $('[data-toggle="wizard-radio"]').click(function() {
        let wizard = $(this).closest('.card-wizard');
        wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
        $(this).addClass('active');
        $(wizard).find('[type="radio"]').removeAttr('checked');
        $(this).find('[type="radio"]').attr('checked', 'true');
      });

      $('[data-toggle="wizard-checkbox"]').click(function() {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $(this).find('[type="checkbox"]').removeAttr('checked');
        } else {
          $(this).addClass('active');
          $(this).find('[type="checkbox"]').attr('checked', 'true');
        }
      });

      $('.set-full-height').css('height', 'auto');

  }
  ngAfterViewInit() {

      $( window ).resize( () => { $('.card-wizard').each(function(){

          const $wizard = $(this);
          const index = $wizard.bootstrapWizard('currentIndex');
          let $total = $wizard.find('.nav li').length;
          let  $li_width = 100/$total;

          let total_steps = $wizard.find('.nav li').length;
          let move_distance = $wizard.width() / total_steps;
          let index_temp = index;
          let vertical_level = 0;

          let mobile_device = $(document).width() < 600 && $total > 3;

          if(mobile_device){
              move_distance = $wizard.width() / 2;
              index_temp = index % 2;
              $li_width = 50;
          }

          $wizard.find('.nav li').css('width',$li_width + '%');

          let step_width = move_distance;
          move_distance = move_distance * index_temp;

          let $current = index + 1;

          if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
              move_distance -= 8;
          } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
              move_distance += 8;
          }

          if(mobile_device){
              let x: any = index / 2;
              vertical_level = parseInt(x);
              vertical_level = vertical_level * 38;
          }

          $wizard.find('.moving-tab').css('width', step_width);
          $('.moving-tab').css({
              'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
              'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
          });

          $('.moving-tab').css({
              'transition': 'transform 0s'
          });
          });
      });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    //console.log(this.fileToUpload);
  }

  onSave(form: NgForm){
    if ( form.invalid ) {
      console.log('returned');
      this.errorInForm = true;
      return;
    } else {
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
        website: form.value.website,
        createdBy: 'Business Sign Up Process'
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
          this.disableSubmit = true;
          Swal.fire({
            title: 'Sign Up Completed Successfully!',
            text: 'You can now close this page. Thanks for supporting V for Victory',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success',
            type: 'success'
          });
        }
      });
    }
  }

}
