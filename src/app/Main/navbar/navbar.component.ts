import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/Modelos/Login';
import { GeneralService } from 'src/app/Servicios/General/general.service';
declare var $: any;
declare var bootstrap: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login: boolean = false;
  admin: boolean = false;
  loadingButton: boolean = false;
  constructor(private servicioGeneral: GeneralService) {
    if(sessionStorage.getItem('userlogin') == '1'){
      this.login = true;
    }
    if(sessionStorage.getItem('userRol') == 'admin'){
      this.admin = true;
    }
  }

  ngOnInit() {
    if(sessionStorage.getItem('userlogin') == '1'){
      this.login = true;
    }
    if(sessionStorage.getItem('userRol') == 'admin'){
      this.admin = true;
    }
  }

  iniciarsesion() {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.loadingButton = true;
    let usuario = new Login();
    let correo: string = $('#loginCorreo').val();
    let pass: string = $('#loginPass').val();
    if (correo == undefined || correo == null || correo == "") {
      alert("Debe Introducir un correo");
      this.loadingButton = false;
      return;
    }
    if (pass == undefined || pass == null || pass == "") {
      alert("Debe Introducir una contraseña");
      this.loadingButton = false;
      return;
    }
    if (!regexp.test(correo)) {
      alert("Debe Introducir un correo valido");
      this.loadingButton = false;
      return;
    }

    usuario.loginCorreo = correo;
    usuario.loginPass = pass;
    this.servicioGeneral.ConsultaInformacionGeneral("loginuser", usuario).subscribe(result => {
      if (result) {
        sessionStorage.setItem('userlogin', result.loginID);
        sessionStorage.setItem('userRol', result.loginRol);
        this.login = true;
        if(result.loginRol == "admin"){
          this.admin = true;
        }
        var myModalEl = document.getElementById('exampleModal');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
      }
      this.loadingButton = false;
    });
  }


  cerrarSesion(){
    sessionStorage.removeItem('userlogin');
    sessionStorage.removeItem('userRol');
    window.location.href = "/";
  }


}
