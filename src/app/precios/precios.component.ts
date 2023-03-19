import { Component, OnInit, ViewChild } from '@angular/core';
import { Imagen } from '../Modelos/Imagen';
import { ModeloPlanes } from '../Modelos/ModeloPlanes';
import { GeneralService } from '../Servicios/General/general.service';
declare var $: any;
@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {
  @ViewChild('carouselExampleControls') carousel: { nativeElement: any; };
  planes: ModeloPlanes[] = [];
  planesActuales: ModeloPlanes[] = [];
  listaCategorias: string[] = [];
  seccionActual: string = "";
  imagenes: Imagen[] = [];
  imagenesActuales: Imagen[] = [];
  constructor(private servicioGeneral: GeneralService) { }

  ngOnInit(): void {
    this.getInfo();
  }
  ngAfterViewInit() {
    // Inicializar el carrusel después de que se muestre el modal
    $(this.carousel.nativeElement).carousel();
    $('.carousel-control-prev').click(function(event: { preventDefault: () => void; }) {
      event.preventDefault();
      $('#carouselExampleControls').carousel('prev');
    });
    $('.carousel-control-next').click(function(event: { preventDefault: () => void; }) {
      event.preventDefault();
      $('#carouselExampleControls').carousel('next');
    });
  }

  getInfo() {
    this.servicioGeneral.ConsultaInformacionGeneral("consultacategoriaplanes", "").subscribe(result => {
      this.planes = result;
      for (var i = 0; i < this.planes.length; i++) {
        if (i == 0) {
          this.seccionActual = this.planes[i].categoria;
        }
        if (!this.listaCategorias.includes(this.planes[i].categoria)) {
          this.listaCategorias.push(this.planes[i].categoria);
        }
        if (this.planes[i].categoria == this.seccionActual) {
          this.planesActuales.push(this.planes[i]);
        }
      }
      this.asignardescripcion();
      this.waitForElm('#itemnav0').then(() => {
        $('#itemnav0').addClass('active');
      });
    });

    this.servicioGeneral.ConsultaInformacionGeneral("imagenescat", "").subscribe(result => {
      this.imagenes = result;
      this.actualizarImg();
    });
  }

  actualizarImg(){
    this.imagenesActuales = [];
    for (let j = 0; j < this.imagenes.length; j++) {
      if (this.planesActuales[0].paquetefotos == this.imagenes[j].categoria) {
        this.imagenesActuales.push(this.imagenes[j]);
      }
    }
    console.log(this.imagenesActuales)
  }
  asignardescripcion() {
    for (let i = 0; i < this.planesActuales.length; i++) {
      let temp = this.planesActuales[i].descripcion.split(";");
      if (temp.length == 0 && this.planesActuales[i].descripcion.length != 0) {
        temp.push(this.planesActuales[i].descripcion);
      }
      for (let j = 0; j < temp.length; j++) {
        if (j == 0) {
          this.planesActuales[i].desc1 = temp[j];
        } else if (j == 1) {
          this.planesActuales[i].desc2 = temp[j];
        } else if (j == 2) {
          this.planesActuales[i].desc3 = temp[j];
        } else if (j == 3) {
          this.planesActuales[i].desc4 = temp[j];
        } else if (j == 4) {
          this.planesActuales[i].desc5 = temp[j];
        }
      }
    }
  }

  waitForElm(selector: any) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  cambiarOpcion(opcion: string, posicion: number) {
    this.seccionActual = opcion;
    this.planesActuales = [];
    for (var j = 0; j < this.planes.length; j++) {
      var element2 = $('#itemnav' + j).removeClass('active');
      if (this.planes[j].categoria == this.seccionActual) {
        this.planesActuales.push(this.planes[j]);
      }
    }
    this.asignardescripcion();
    this.actualizarImg();
    $('#itemnav' + posicion).addClass('active');
  }

}
