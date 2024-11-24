import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router, private api: ApiService) { }


  logout() {

    localStorage.clear();

    this.api.success('Logout Successfully.......')

    // Swal.fire({
    //   title: 'Logout Succesfully',
    //   icon: 'success'
    // })

    this.router.navigate(['/']);


  }

}
