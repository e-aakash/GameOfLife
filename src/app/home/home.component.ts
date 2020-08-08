import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rows:number = 10;
  columns:number = 10;
  submitted:boolean = false;

  constructor() {
    this.rows = 10;
    this.columns = 10; 
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.rows, " ", this.columns);
  }

}
