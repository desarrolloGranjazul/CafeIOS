import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { Persona } from '../model/Persona';
import { Variables } from '../enum/Variables';
import { EndPoint } from '../enum/EndPoint.enum';
import { interval, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseApi } from '../model/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class ApiService  {

  private urlApi: string = environment.urlApi;

  public intervalTurno$ ;

  public recargar:number = 0;


  constructor(private http: HttpClient, private router: Router) {

    console.log('URL Apis: '+this.urlApi);

  }

  get personasesion():Persona {
    let payload = localStorage.getItem(Variables.PAYLOAD);
    return  Persona.instance(JSON.parse(""+payload))
  }

  get urlImagenLocal(): string {
    return 'assets/img';
  }

  get tiempoDebounce() {
    return 700;
  }

  get isLogin() {
    let token = localStorage.getItem(Variables.TOKEN_LOCALSTORAGE);
    return (token && token.length > 0) ? true : false;
  }

  private get headers() {
    return {
      headers: { 'content-type': 'application/json' }
    }
  }

  private body(obj: any) {
    return obj;
  }

  mensajeError(error:any){
    return error['sqlMessage']||JSON.stringify(error)||error
  }

  detenerIntervalTurno(){
    try {
      console.log('Deteniendo timer...');
      clearInterval(this.intervalTurno$);
      this.intervalTurno$ = 0;
    } catch (error) {
      console.log(error)
    }
  }

  obtenerFechaActual():string {

    let fecha = new Date();
    let fechaFormateada: string = '';

    let dd = String(fecha.getDate()).padStart(2, '0');
    let mm = String(fecha.getMonth() + 1).padStart(2, '0');
    let yyyy = fecha.getFullYear();

    fechaFormateada = yyyy+'-'+mm+'-'+dd ;

    return fechaFormateada;
  }

  iniciarSesion(api: EndPoint, data: any) {
    let url = `${this.urlApi}/${api}/login`;
    return this.response(this.http.post(`${url}`, this.body(data), this.headers));
  }

  registrarse(api: EndPoint, data: any) {
    let url = `${this.urlApi}/${api}/registro`;
    this.logPeticion('registrarse', url, data);
    return this.response(this.http.post(`${url}`, this.body(data), this.headers));
  }

  cerrarSesion() {
    localStorage.removeItem(Variables.TOKEN_LOCALSTORAGE);
    localStorage.removeItem(Variables.PAYLOAD);
    this.router.navigateByUrl("/" + EndPoint.LOGIN);
  }

  post(api: string, data: any) {
    let url = `${this.urlApi}/${api}`;
    this.logPeticion('post', url, data);
    return this.response(this.http.post(url, this.body(data), this.headers));
  }

  buscarFiltro(api:string, data:any, estricto:string){
    let url;
    if(data === undefined){
      let url = `${this.urlApi}/${api}/ `;
      this.logPeticion('get', url);
      return this.response(this.http.get(url));
    } else {
      let url = (estricto==="N") ? `${this.urlApi}/${api}/filtro`: `${this.urlApi}/${api}/filtroestricto`;
      this.logPeticion('post', url, data);
      return this.response(this.http.post(url, this.body(data), this.headers));
    }
  }

  cargar(api: string, id: string | undefined) {
    let url;
    if (id) {
      url = `${this.urlApi}/${api}/${id}`;
    } else {
      url = `${this.urlApi}/${api}`;
    }
    this.logPeticion('cargar', url);
    return this.response(this.http.get(url));
  }

  eliminar(api: EndPoint, id: string | number) {
    let url = `${this.urlApi}/${api}/${id}`;
    this.logPeticion('eliminar', url, id);

    return this.response(this.http.delete(url));
  }

  log(ubicacion: string, dato: any) {
    //console.log(' =>> Ubicacion', ubicacion, ' =>> dato', dato);
  }


  private logPeticion(metodo: string, url: string, datos?: any) {
    //console.log('=>>', metodo, ' =>> Url', url, ' =>> datos', datos);
  }

  //Creo un objeto de tipo ResponseApi con la peticion
  private response(solicitud: Observable<any>) {
    return solicitud.pipe(
      map(resp => ResponseApi.getInstance(resp))
    );
  }
}
