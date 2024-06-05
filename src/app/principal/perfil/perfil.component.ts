import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Persona } from '../../model/Persona';
import { Variables } from '../../enum/Variables';
import { EndPoint } from '../../enum/EndPoint.enum';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsService } from '../../services/forms.service';
import { SwaService } from '../../services/swa.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit, AfterViewChecked {

  private endPoint: EndPoint = EndPoint.PERSONA;

  jwtHelper = new JwtHelperService();

  persona: Persona = Persona.instance('');

  //Lo creo con formulario reactivo porque es mas facil
  formulario: FormGroup = this.fs.fb.group(
    {
      dpi: [, [Validators.required, Validators.minLength(13)]],
      nombre: [, [Validators.required, Validators.minLength(3)]],
      correo: [, [Validators.required, Validators.email]],
      usuario: [],
      codigo_sap: [],
      departamento: []
    });

  constructor(private api: ApiService, private sa: SwaService, public fs: FormsService, private router: Router) { }


  ngOnInit(): void {
    console.log("Perfil recargado");
    
    this.api.detenerIntervalTurno();
    this.iniciarFormulario();
    
    //Me subscribo al formulario para que el objeto siempre este actualizado
    this.formulario.valueChanges.subscribe(datos => {
      this.persona = datos;
    })

     //No comentar ni borrar porque el ngAfterViewChecked dejaria inutilizable al interfaz
     this.api.recargar = 0;
  }

  ngAfterViewChecked(){
    if(this.api.recargar>0){
      this.ngOnInit();
    }
  }

  iniciarFormulario() {
    //Le establesco al servicio que estoy trabajando con este formulario
    this.fs.setFomulario(this.formulario);

    let data = {
      idpersona: this.api.personasesion.idpersona
    }

    this.api.post('persona/filtroestricto', data).subscribe(resp => {      
      if (resp.ok) {       
        this.persona = resp.data[0];

        //Le paso los datos del objeto al formulario
        this.formulario.reset(this.persona);
      } else {
        this.sa.error('Error', resp.error)
      }
    })

  }

  guardar() {  
    //Valido que el formulario sea valido
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.sa.error('', 'Formulario invalido');
      return;
    }

    let persona = {
        idpersona : this.api.personasesion.idpersona,
        dpi: this.persona.dpi,
        nombre: this.persona.nombre,
        correo: this.persona.correo,
        usuario: this.persona.usuario,
        codigo_sap: this.persona.codigo_sap,
        departamento: this.persona.departamento
    }
    
 
   
    this.api.post('persona', persona).subscribe(resp => {      
      if (resp.ok) {
        this.sa.realizado('actualizacion correcta', '');
      } else {
        this.sa.error('Error', resp.error)
      }
    })
  }

}
