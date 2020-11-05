import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserModel } from '../user.model';
import { Router } from '@angular/router';

declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: UserModel[];
}

@Component({
  selector: 'app-list-volunteers',
  templateUrl: './list-volunteers.component.html',
  styleUrls: ['./list-volunteers.component.css']
})
export class ListVolunteersComponent implements OnInit {
  public usersList: UserModel[];
  public dataTable: DataTable;

  constructor(public userService: UsersService, public router: Router) {}

  ngOnInit() {
    this.userService.listUsers().subscribe((usersReturned) => {
      if (usersReturned) {
        this.usersList = usersReturned.results;
        // console.log(this.usersList);
        this.dataTable = {
          headerRow: [ 'Id', 'Name', 'Email', 'Address', 'role', 'Status', 'Actions' ],
          footerRow: [ 'Id', 'Name', 'Email', 'Address', 'role', 'Status', 'Actions'],
          dataRows: this.usersList
        };
       }
    });
  }

  ngAfterViewInit(){
    $('#datatable').DataTable({
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

    var table = $('#datatable').DataTable();
  }

  getRoleDescription(roleId: string) {
    if (roleId === '1') {
      return 'Administrator';
    } else {
      return 'Volunteer';
    }
  }
 getStatusDescription(statusId: string) {
    if (statusId === '1') {
      return 'Active';
    } else {
      return 'Inactive';
    }
  }
}
