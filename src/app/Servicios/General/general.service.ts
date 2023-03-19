import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Login } from 'src/app/Modelos/Login';
import { ModeloPlanes } from 'src/app/Modelos/ModeloPlanes';
import { Imagen } from 'src/app/Modelos/Imagen';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  private apiLogin = '/api/login';
  private apiGeneral = '/api/general';

  private cache: any;

  public ConsultaInformacionGeneral(consulta: string, variables: any): Observable<any>{
    let respuesta: Observable<any>;
    let endPoint: string = "http://localhost:6044";
    let url: string = "";

    switch(consulta.toLowerCase()){
      case "loginuser":
        url = `${endPoint}${this.apiLogin}/login`;
        respuesta = this.http.put<Login>(url,variables).pipe(catchError(this.handleError));
        break;

      case "consultacategoriaplanes":
        url = `${endPoint}${this.apiGeneral}/planes`;
        respuesta = this.http.get<ModeloPlanes[]>(url).pipe(catchError(this.handleError));
        break;

      case "consultatipoimagenes":
        url = `${endPoint}${this.apiGeneral}/tipoimagen`;
        respuesta = this.http.get<String[]>(url).pipe(catchError(this.handleError));
        break;

      case "guardaplan":
        url = `${endPoint}${this.apiGeneral}/guardaplan`;
        respuesta = this.http.put<boolean>(url,variables).pipe(catchError(this.handleError));
        break;

      case "actualizaplan":
        url = `${endPoint}${this.apiGeneral}/actualizaplan`;
        respuesta = this.http.put<boolean>(url,variables).pipe(catchError(this.handleError));
        break;

      case "eliminarplan":
        url = `${endPoint}${this.apiGeneral}/eliminarplan`;
        respuesta = this.http.put<boolean>(url,variables).pipe(catchError(this.handleError));
        break;

      case "imagenescat":
        url = `${endPoint}${this.apiGeneral}/imagenescat`;
        respuesta = this.http.get<Imagen[]>(url,variables).pipe(catchError(this.handleError));
        break;
    }
    // @ts-ignore
    return respuesta;
  }

  private handleError(error: any){
    console.log(error);
    return throwError(error);
  }
}
