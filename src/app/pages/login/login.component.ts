import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserModel } from '../../user.model';
import { UserAPIResponse } from '../../response.model';
import {AuthService} from '../../auth.service';
import { NgForm } from '@angular/forms';
import {Buffer} from '../../../../node_modules/buffer'


declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
  focus;
  focus1;
  focus2;
    test : Date = new Date();
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    private userModel: UserModel;
    private apiResponse: UserAPIResponse;
    private endSession: boolean;
    noLoginValuesAlert: boolean;
    incorrectUserAlert: boolean;
    logoutAlert: boolean;
    private fromPasswordReset: boolean;
    public passwordResetAlert: boolean;

    constructor(private element : ElementRef, public authService: AuthService,
      private router: Router, private activeRoute: ActivatedRoute) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;

        this.activeRoute.queryParams.subscribe(params => {
          this.endSession = params['endSession'];
<<<<<<< HEAD
          this.fromPasswordReset = params['fromResetPassword'];
        });

        if (this.endSession) {
          this.logoutAlert = true;
          this.fromPasswordReset = false;
          localStorage.removeItem('currentUser');
        }

        if (this.fromPasswordReset) {
          this.passwordResetAlert = true;
        }
=======
        });
        if (this.endSession) {
          this.logoutAlert = true;
          localStorage.removeItem('currentUser');
        }
>>>>>>> 030d892982257ae390b5eb53aa07cbce9df585ec
    }
    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit(){
        this.checkFullPageBackgroundImage();
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
    }
    sidebarToggle(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if(this.sidebarVisible == false){
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            },500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }

    onLogin(form: NgForm) {
      if ( form.invalid ) { // Validating form has data
        this.noLoginValuesAlert = true;
        this.incorrectUserAlert = false;
        this.logoutAlert = false;
        return;
      }
      const user: any = {
        userName: form.value.userName,
        password: form.value.password
      };
      this.authService.getUser(user.userName, user.password).subscribe((userReturned) => {
        if (userReturned) {
          this.userModel = userReturned.results[0];
          localStorage.setItem('currentUser', JSON.stringify(this.userModel));
          this.router.navigate(['/dashboard']);
        } else {
          this.incorrectUserAlert = true;
          this.logoutAlert = false;
          this.noLoginValuesAlert = false;
        }
      });
    }
}
