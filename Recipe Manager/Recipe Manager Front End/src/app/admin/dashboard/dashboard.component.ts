import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  date: any;
  user: any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") || "{}")
    this.date = new Date();
  }

}
