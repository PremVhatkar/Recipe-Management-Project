import { NgLocaleLocalization } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id == undefined) {
      this.router.navigate(['/']);
    }
  }


}
