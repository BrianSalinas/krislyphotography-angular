import { Component, ElementRef, ViewChild } from '@angular/core';
import { Imagen } from '../Modelos/Imagen';
import { ModeloCategorias } from '../Modelos/ModeloCategorias';
import { ImagenService } from '../Servicios/Imagen/imagen.service';
declare var $: any;
@Component({
  selector: 'app-adm-imagenes',
  templateUrl: './adm-imagenes.component.html',
  styleUrls: ['./adm-imagenes.component.css']
})
export class AdmImagenesComponent {
  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;
  @ViewChild('imagenInputFile', {static: false}) imagenFileTEMPORAL: ElementRef;
  imagenes: Imagen[] = [];
  imagen: File;
  imagenMin: File;
  spinner: boolean = false;
  listaCategoriasImagen: string[] = [];
  categoriasGlobales: ModeloCategorias[] = [];
  fotoActual:string = "";
  constructor(private imagenService: ImagenService){

  }

  ngOnInit(){
    this.cargarImagenes();
    this.getInfo();
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

  borrar(id: string): void {
    this.imagenService.delete(id).subscribe(data => {
        this.cargarImagenes();
      },err => {
        alert("Error al eliminar la imagen")
        console.log(err);
      }
    );
  }

  onFileChange(event:any) {
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }

  onUpload(): void {
    this.spinner = true;
    this.imagenService.upload(this.imagen).subscribe(
      data => {
        alert("Imagen Subida con Exito");
        this.spinner = false;
        $('#cerrarCargaImagen').click();
        this.cargarImagenes();
      },
      err => {
        this.spinner = false;
        alert("Error al Subir la imagen");
        alert(err.error.mensaje);
        this.reset();
      }
    );
  }

  reset(): void {
    let temp: any = null;
    this.imagen = temp;
    this.imagenMin = temp;
    this.imagenFile.nativeElement.value = '';
    this.spinner = false;
  }

  abrirCategoria(imagen: Imagen){
    this.fotoActual = imagen.id;
    this.listaCategoriasImagen = imagen.categoria.split(";");
  }

  agregarCategoria(){
    var categoria = $('#categoriaEscogida').val();
    if(!this.listaCategoriasImagen.includes(categoria)){
      this.listaCategoriasImagen.push(categoria);
    }
  }
  eliminarCategoria(categoria:string){
    var temp: string[]= [];

      for(var i=0;i<this.listaCategoriasImagen.length;i++){
        if(this.listaCategoriasImagen[i] != categoria){
          temp.push(this.listaCategoriasImagen[i]);
        }
      }
    this.listaCategoriasImagen = temp;

  }

  guardarCategoriaFoto(){
    var cate = new ModeloCategorias();
    cate.id = this.fotoActual;
    cate.categoria = this.listaCategoriasImagen.join(";");
    this.imagenService.agregarCategoria(cate).subscribe(data => {
      this.cargarImagenes();
    }
  );
  $('#cerrarCat').click();
  }

}
