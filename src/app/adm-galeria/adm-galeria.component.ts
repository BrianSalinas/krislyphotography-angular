import { Component } from '@angular/core';
import { Imagen } from '../Modelos/Imagen';
import { ModeloCategorias } from '../Modelos/ModeloCategorias';
import { ImagenService } from '../Servicios/Imagen/imagen.service';
declare var $: any;
@Component({
  selector: 'app-adm-galeria',
  templateUrl: './adm-galeria.component.html',
  styleUrls: ['./adm-galeria.component.css']
})
export class AdmGaleriaComponent {
  categoriasGlobales: ModeloCategorias[] = [];
  categoriasTemporal: ModeloCategorias[] = [];
  listaCategoriasNew: string[] = [];
  openAccordion: boolean[] = [];
  imagenes: Imagen[] = [];
  categoriaNueva: string = "";
  constructor(private imagenService: ImagenService){

  }

  ngOnInit(){
    this.getInfo();
    this.cargarImagenes();
  }

  getInfo(){
    this.imagenService.listCategorias().subscribe(data => {
      this.categoriasGlobales = data;
    }
    );
  }

  cargarImagenes(){
    this.imagenService.list().subscribe(data => {
        this.imagenes = data;
      }
    );
  }

  agregarCategoria(){
    let temporal: string[] = [];
    for(var i=0;i<this.categoriasTemporal.length;i++){
      temporal.push(this.categoriasTemporal[i].categoria);
    }
    if(this.categoriaNueva != "" && !temporal.includes(this.categoriaNueva)){
      let temp = new ModeloCategorias();
      temp.categoria = this.categoriaNueva;
      temp.navbar = "NO";
      this.categoriasTemporal.push(temp);
      this.listaCategoriasNew.push(this.categoriaNueva);
      this.guardarCategorias();
    }
  }

  eliminarCategoria(item:ModeloCategorias){
    this.imagenService.eliminarCategoriaGlobal(item.categoria).subscribe(data => {
      this.getInfo();
      var temp: ModeloCategorias[] = [];
      for(var i=0;i<this.categoriasTemporal.length;i++){
        if(this.categoriasTemporal[i].categoria != item.categoria){
          temp.push(this.categoriasTemporal[i]);
        }
      }
      this.categoriasTemporal = temp;
    }
    );
  }

  guardarCategorias(){
    this.imagenService.agregarCategoriaGlobal(this.listaCategoriasNew).subscribe(data => {
      this.getInfo();
    }
  );
  }

  abrirModal(){
    this.categoriasTemporal.splice(0)
    for(var i=0;i<this.categoriasGlobales.length;i++){
      this.categoriasTemporal.push(this.categoriasGlobales[i]);
    }
    this.listaCategoriasNew = [];
    $('#categoriaEscogida').val("");
  }
}
