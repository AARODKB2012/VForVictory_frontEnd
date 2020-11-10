import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {EmailService} from '../../email.service';
import {UsersService} from '../../users.service';
import { NgForm } from '@angular/forms';
import { UserModel } from 'app/user.model';

declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'lock-cmp',
    templateUrl: './lock.component.html'
})

export class LockComponent implements OnInit{
    test : Date = new Date();
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    public emailSent: boolean;
    public emailNotFound: boolean;
    private userModel: UserModel;
    public errorInForm: boolean;

    constructor(private element : ElementRef, public emailService: EmailService, public userService: UsersService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
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
        body.classList.add('lock-page');

        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }

    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('lock-page');
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

    forgotPassword(form: NgForm) {
        if ( form.invalid ) {
            this.errorInForm = true;
            return;
        } else {
            this.errorInForm = false;
            this.userService.getVolunteerByEmail(form.value.email).subscribe((response) => {
                if (response.status === 200) {
                    this.emailNotFound = false;
                    const emailObject = {
                        mailTo: form.value.email,
                        subject: 'Password Reset',
                        messageBody: 'To reset your password click here:'
                    }
    
                    this.emailService.sendEmail(emailObject).subscribe((mailResponse) => {
                        if (mailResponse) {
                        this.emailSent = true;
                        }
                    });
                } else {
                  this.emailNotFound = true;
                }
            });
        }


    }
}
