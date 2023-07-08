import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'

let bootstrap: any;

const templateParams = {
  nombre: '',
  message: '',
  phone_number: '',
  client_email: '',
};

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent {
  sendingEmail: boolean = false;
  mensajeToast: string = '';

  sentEmail() {
    this.sendingEmail = true;
    templateParams.nombre = (
      document.getElementById('nombre') as HTMLInputElement
    ).value;
    templateParams.message = (
      document.getElementById('mensaje') as HTMLInputElement
    ).value;
    templateParams.client_email = (
      document.getElementById('email') as HTMLInputElement
    ).value;
    templateParams.phone_number = (
      document.getElementById('numero') as HTMLInputElement
    ).value;

    emailjs.init("5PS5m_kFTLP6GAu9i");
    emailjs.send('service_8bj8snf', 'template_cs79b5z', templateParams).then(
      (response) => {
        this.sendingEmail = false;
        this.mensajeToast =
          'Se ha enviado satisfactoriamente, en unos pocos dias nos contactaremos con usted.';
          Swal.fire({
            icon: 'success',
            title: 'Envio Satisfactorio',
            text: this.mensajeToast,
            showCloseButton: true,
          });
          (document.getElementById('nombre') as HTMLInputElement).value = "";
          (document.getElementById('mensaje') as HTMLInputElement).value = "";
          (document.getElementById('email') as HTMLInputElement).value = "";
          (document.getElementById('numero') as HTMLInputElement).value = "";
      },
      (error) => {
        this.sendingEmail = false;
        this.mensajeToast =
          'Estamos teniendo problemas tecnicos, favor realizar su consulta por nuestras otras redes sociales.';
          Swal.fire({
            icon: 'error',
            title: 'Envio Erroneo',
            text: this.mensajeToast,
            showCloseButton: true,
          });
          (document.getElementById('nombre') as HTMLInputElement).value = "";
          (document.getElementById('mensaje') as HTMLInputElement).value = "";
          (document.getElementById('email') as HTMLInputElement).value = "";
          (document.getElementById('numero') as HTMLInputElement).value = "";
      }
    );
  }

}
