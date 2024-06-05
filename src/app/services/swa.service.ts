import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SwaService  {

  constructor(private alertController: AlertController) { }

  private alertBasico = async (titulo: string, mensaje: string = '')=> {


    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  realizado(titulo: string, mensaje?: string) {
    this.alertBasico( titulo, mensaje)
  }

  error(titulo: string, mensaje?: string) {
    this.alertBasico( titulo, mensaje);
  }

}
