import { Component, OnInit } from '@angular/core';
import { EndPoint } from '../../enum/EndPoint.enum';
import { Persona } from '../../model/Persona';
import { FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { SwaService } from '../../services/swa.service';
import { FormsService } from '../../services/forms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validarcorreo',
  templateUrl: './validarcorreo.component.html',
  styleUrls: ['./validarcorreo.component.scss'],
})
export class ValidarcorreoComponent implements OnInit {
  logo:string ="Granjazul.png"

  endPoint: EndPoint = EndPoint.PERSONA;
  

  persona: Persona = Persona.instance('');

  //Lo creo con formulario reactivo porque es mas facil
  formulario: FormGroup = this.fs.fb.group(
    {
      correo: [, [Validators.required, Validators.email]]
    });

  constructor(private api: ApiService, private sa: SwaService, public fs: FormsService, private router: Router) { }

  ngOnInit(): void {

    this.iniciarFormulario();
    
    //Me subscribo al formulario para que el objeto siempre este actualizado
    this.formulario.valueChanges.subscribe(datos => {
      this.persona = datos;
    })
  }

  iniciarFormulario() {
    //Le establesco al servicio que estoy trabajando con este formulario
    this.fs.setFomulario(this.formulario);
    //Le paso los datos del objeto al formulario
    this.formulario.reset(this.persona);

  }


  guardar(){

      //Valido que el formulario sea valido
      if (this.formulario.invalid) {
        this.formulario.markAllAsTouched();
        this.sa.error('', 'Formulario invalido');
        return;
      }
  

    	let codigo =   parseInt(this.generarCodigo());

      let data = {
        correo: this.persona.correo
      };

      this.api.post(this.endPoint+"/filtro", data).subscribe(resp => {
        if (resp.ok && resp.data.length > 0) {
          let obj: any = resp.data;
          let persona:Persona = Persona.instance(obj[0]);         
          let datos = {
              idpersona: persona.idpersona,
              codigo_password: codigo
          }
          this.api.post(this.endPoint, datos).subscribe(resp => {            
            if (resp.ok) {

              let data = {
                correo: persona.correo,
                codigo: codigo
              }

              this.api.post(this.endPoint+"/enviarclave", data).subscribe(resp => {            
                if (resp.ok) {
                  this.router.navigateByUrl('password');    
                } else {
                  this.sa.error('Error',  resp.error)
                }
              });              
            } else {
              this.sa.error('Error', resp.error)
            }
          });
      
        } else {
          this.sa.error('Error', "Correo no existe")
        }
      });
  
  }

  generarCodigo = ():string =>{
    return ""+
      Math.floor(Math.random() * 9) 
    + Math.floor(Math.random() * 9) 
    + Math.floor(Math.random() * 9) 
    + Math.floor(Math.random() * 9) 
    + Math.floor(Math.random() * 9)
    + Math.floor(Math.random() * 9)
    ;
 
  }
}
