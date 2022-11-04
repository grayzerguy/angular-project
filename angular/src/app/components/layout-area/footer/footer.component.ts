import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // public yearAndMonth = new Date().getFullYear() + '-' + (new Date().getMonth() + 1);
  //date format: dd-mm-yyyy
  public yearAndMonth = new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear();


  constructor() { }

  ngOnInit(): void {
    console.log(this.yearAndMonth);
  }


}
