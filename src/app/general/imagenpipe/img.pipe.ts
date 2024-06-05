import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {


  constructor(private apiService:ApiService){}

  transform(imagen: string): string {
    if(!imagen){
      return this.apiService.urlImagenLocal+'notfound.png';
    }
    return `${this.apiService.urlImagenLocal}/`+imagen;
  }
}
