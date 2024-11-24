import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any;

  constructor(private api: ApiService, private router: Router) {

  }

  ngOnInit(): void {

   this.bind();

  }

  bind(){
    this.api.get('orders').subscribe((result) => {
      this.orders = result
    })
  }

  delete(id: number) {
    if (confirm("Sure to delete?")) {
      this.api.delete("orders/" + id).subscribe((result) => {
        this.api.success('Data Remove Successfully.......')
        this.bind();
      });
    }
  }

  edit(id: number) {
    this.router.navigate(['/admin/order/' + id]);
  }

}

