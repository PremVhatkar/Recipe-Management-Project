import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private http: HttpClient,private toastr: ToastrService) { 

  }


  baseurl = "http://localhost:5248/api/";


  get(path: string) {
    return this.http.get(this.baseurl + path);
  }

  post(path: string, data: any) {
    return this.http.post(this.baseurl + path, data);
  }

  delete(path: string) {
    return this.http.delete(this.baseurl + path);

  }

  put(path: string, data: any) {
    return this.http.put(this.baseurl + path, data);
  }




  success(msg:any) {
    this.toastr.success(msg);
    
  }

  error(msg:any) {
    this.toastr.error(msg);
  }

  warning(msg:any) {
    this.toastr.warning(msg);
  }

  info(msg:any) {
    this.toastr.info(msg);
  }

}
