import { Component } from '@angular/core';

@Component({
  selector: 'app-adm-dashboard',
  templateUrl: './adm-dashboard.component.html',
  styleUrls: ['./adm-dashboard.component.css']
})
export class AdmDashboardComponent {
  constructor(){
    if(sessionStorage.getItem('userlogin') != 'true' && sessionStorage.getItem('userRol') != 'admin'){
      window.location.href = "/";
    }
  }

}
