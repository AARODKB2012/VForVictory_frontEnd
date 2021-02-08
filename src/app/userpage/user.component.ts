import { environment } from 'environments/environment';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { UserModel } from 'app/user.model';
import { UsersService } from 'app/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent{
    public fullName: string;
    public username: string = null;
    public userId: number;
    public profilePictureURL: string = null;
    public user: UserModel;
    public educationLevelList: [];
    public roleList: [];
    constructor(public userService: UsersService, public router: Router, private activeRoute: ActivatedRoute) {
        this.activeRoute.queryParams.subscribe(params => {
            this.userId = params['id'];
        });

        if (this.userId) {
            this.userService.getVolunteerById(this.userId).subscribe((responseData) => {
              if (responseData) {
                this.user = responseData.results[0];
              }
            });
          }

        this.fullName = JSON.parse(localStorage.getItem('currentUser')).first_name + ' ' +
        JSON.parse(localStorage.getItem('currentUser')).last_name;
        
        if (JSON.parse(localStorage.getItem('currentUser')).profile_picture_url){
            this.username = JSON.parse(localStorage.getItem('currentUser')).username;
            this.profilePictureURL = environment.backendURL + `api/volunteer/username/${this.username}/profile/picture`;
        }
    }

    ngOnInit() {
        this.userService.getAllEducations().subscribe((responseData) => {
            if (responseData) {
              this.educationLevelList = responseData.results;
            }
        });
        this.userService.getAllRoles().subscribe((responseData) => {
            if (responseData) {
              this.roleList = responseData.results;
            }
        });
    }
}
