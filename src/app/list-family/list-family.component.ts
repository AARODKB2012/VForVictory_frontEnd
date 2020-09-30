import { Component, OnInit } from '@angular/core';

declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: String[][];
}

@Component({
  selector: 'app-list-family',
  templateUrl: './list-family.component.html',
  styleUrls: ['./list-family.component.css']
})
export class ListFamilyComponent implements OnInit {
    public dataTable: DataTable;
    ngOnInit(){
        this.dataTable = {
            headerRow: [ 'Name', 'Contact Name', 'Email', 'Family Size', 'Budget', 'Actions' ],
            footerRow: [ 'Name', 'Contact Name', 'Email', 'Family Size', 'Budget', 'Actions' ],
            dataRows: [
                ['Airi Satou', 'Jacob McCann', 'satoua@gmail.com', '4', '$990',''],
                ['Angelica Ramos', 'Jacob McCann', 'emailplaceholder@mail.com', '2', '$620', 'btn-round'],
                ['Ashton Cox', 'Angel Selva-Rodriguez', 'emailplaceholder@mail.com', '5', '$730', 'btn-simple'],
                ['Bradley Greer','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Brenden Wagner', 'Jonathan Cordova', 'examplemail@mail.org', '4', '$450', ''],
                ['Brielle Williamson','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Caesar Vance','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Cedric Kelly','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Charde Marshall','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Colleen Hurst','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Dai Rios', 'Jacob McCann', 'mailingexample@mail.net', '3', '-$130',''],
                ['Doris Wilder', 'Jacob McCann', 'emailplaceholder@mail.com', '2', '$620', 'btn-round'],
                ['Fiona Green', 'Angel Selva-Rodriguez', 'emailplaceholder@mail.com', '5', '$730', 'btn-simple'],
                ['Garrett Winters','Jimmy Pena', 'testmail@mail.com', '6', '$1,000', 'btn-round'],
                ['Gavin Cortez', 'Jonathan Cordova', 'examplemail@mail.org', '4', '$450', ''],
                ['Gavin Joyce','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Gloria Little','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Haley Kennedy','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Herrod Chandler','Jimmy Pena', 'testmail@mail.com', '6', '$1,000', 'btn-round'],
                ['Hope Fuentes','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Howard Hatfield', 'Jacob McCann', 'mailingexample@mail.net', '3', '-$130',''],
                ['Jena Gaines', 'Jacob McCann', 'emailplaceholder@mail.com', '2', '$620', 'btn-round'],
                ['Jenette Caldwell', 'Angel Selva-Rodriguez', 'emailplaceholder@mail.com', '5', '$730', 'btn-simple'],
                ['Jennifer Chang','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Martena Mccray', 'Jonathan Cordova', 'examplemail@mail.org', '4', '$450', ''],
                ['Michael Silva','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Michelle House','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Paul Byrd','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Prescott Bartlett','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Quinn Flynn','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Rhona Davidson', 'Jacob McCann', 'mailingexample@mail.net', '3', '-$130',''],
                ['Shou Itou', 'Jacob McCann', 'emailplaceholder@mail.com', '2', '$620', 'btn-round'],
                ['Sonya Frost', 'Angel Selva-Rodriguez', 'emailplaceholder@mail.com', '5', '$730', 'btn-simple'],
                ['Suki Burks','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Tatyana Fitzpatrick', 'Jonathan Cordova', 'examplemail@mail.org', '4', '$450', ''],
                ['Tiger Nixon','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Timothy Mooney','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Unity Butler','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Vivian Harrell','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round'],
                ['Yuri Berry','Jimmy Pena', 'testmail@mail.com', '3', '$1,000', 'btn-round']
            ]
         };
    }

    ngAfterViewInit(){
      $('#familytable').DataTable({
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

      var table = $('#familytable').DataTable();

      // Edit record
      table.on('click', '.edit', function() {
        let $tr = $(this).closest('tr');

        var data = table.row($tr).data();
        alert('Click here to view or edit ' + data[0] + '\'s information.');
      });

      // Archive a record.
      table.on('click', '.archive', function(e) {
        var c = confirm("Are you sure you wish to archive this family?");
        if(c) {
          let $tr = $(this).closest('tr');
          table.row($tr).remove().draw();
          e.preventDefault();
        }
      });

      // View record requests.
      table.on('click', '.service', function() {
        alert('Click here to view or add service requests.');
      });
    }
}
