import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imagen } from 'src/app/Modelos/Imagen';
import { ModeloCategorias } from 'src/app/Modelos/ModeloCategorias';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  imagenURL = 'http://localhost:8080/api/main/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Imagen[]> {
    return this.httpClient.get<Imagen[]>(this.imagenURL + 'list');
  }
  public listbycat(variable:string): Observable<Imagen[]> {
    return this.httpClient.post<Imagen[]>(this.imagenURL + 'listCAT',variable);
  }
  public listCategorias(): Observable<ModeloCategorias[]> {
    return this.httpClient.get<ModeloCategorias[]>(this.imagenURL + 'listCategorias');
  }

  public upload(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    return this.httpClient.post<any>(this.imagenURL + 'upload', formData);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.imagenURL + `delete/${id}`);
  }

  public agregarCategoria(cat: ModeloCategorias): Observable<ModeloCategorias>{
    return this.httpClient.post<ModeloCategorias>(this.imagenURL + "updatecategoria",cat);
  }
  public agregarCategoriaGlobal(cat: string[]): Observable<string[]>{
    return this.httpClient.post<string[]>(this.imagenURL + "addCategoria",cat);
  }
  public eliminarCategoriaGlobal(cat: string): Observable<string>{
    return this.httpClient.post<string>(this.imagenURL + "eliminarCategoria",cat);
  }
}
