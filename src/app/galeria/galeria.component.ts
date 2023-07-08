import { Component, OnInit } from '@angular/core';
import { Imagen } from '../Modelos/Imagen';
import { ModeloCategorias } from '../Modelos/ModeloCategorias';
import { ImagenService } from '../Servicios/Imagen/imagen.service';
declare var $: any;
@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit{
  categoriasGlobales: ModeloCategorias[] = [];
  categoriasGlobalesTEMP: ModeloCategorias[] = [];
  imagenes: Imagen[] = [];
  categoriaActual: string = "TODO";
  selectedImg = "";
  constructor(private imagenService: ImagenService) { }

  ngOnInit(): void {
    this.getInfo();
    this.cargarImagenes();
  }

  getInfo(){
    this.imagenService.listCategorias().subscribe(data => {
      this.categoriasGlobalesTEMP = data;
      for(var i=0;i<this.categoriasGlobalesTEMP.length;i++){
        if(this.categoriasGlobalesTEMP[i].navbar == "SI"){
          this.categoriasGlobales.push(this.categoriasGlobalesTEMP[i]);
        }
      }
    }
    );
  }
  cargarImagenes(){
    this.imagenService.list().subscribe(data => {
        this.imagenes = data;
      }
    );
  }

  cambiarOpcion(categoria:string,posicion:number){
    var contador: number = 0;
    for(var i=0;i<this.categoriasGlobales.length;i++){
      if(this.categoriasGlobales[i].navbar == "SI"){
        contador++;
      }
    }
    var element1 = $('#itemnavini').removeClass('active');
    for(var j = 0; j<contador;j++){
      var element2 = $('#itemnav'+j).removeClass('active');
    }

    if(posicion == -1){
      $('#itemnavini').addClass('active');
    }else{
      $('#itemnav'+posicion).addClass('active');
    }
    if(categoria == "TODO"){
      this.imagenService.list().subscribe(data => {
        this.imagenes = data;
      }
    );
    }else{
      this.imagenService.listbycat(categoria).subscribe(data => {
        this.imagenes = data;
      }
      );
    }
  }

  openModal(imgUrl:string){
    this.selectedImg = imgUrl;
  }

}
