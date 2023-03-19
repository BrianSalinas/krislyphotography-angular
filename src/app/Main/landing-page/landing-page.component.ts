import { Component, OnInit } from '@angular/core';
import { Imagen } from 'src/app/Modelos/Imagen';
import { ImagenService } from 'src/app/Servicios/Imagen/imagen.service';
declare var $: any;
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  imagenes: Imagen[] = [];
  imagenesLANDPAGE: Imagen[] = [];
  constructor(private imagenService: ImagenService) { }

  ngOnInit(){
    this.cargarImagenes();
  }
  cargarImagenes(){
    this.imagenService.list().subscribe(data => {
        this.imagenes = data;
        for(let i=0;i<this.imagenes.length;i++){
          if(this.imagenes[i].categoria.includes("LANDPAGE")){
            this.imagenesLANDPAGE.push(this.imagenes[i]);
          }
        }
      }
    );
  }

}
