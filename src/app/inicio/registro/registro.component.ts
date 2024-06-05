import { Component, OnInit } from '@angular/core';
import { EndPoint } from '../../enum/EndPoint.enum';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Persona } from '../../model/Persona';
import { FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { SwaService } from '../../services/swa.service';
import { FormsService } from '../../services/forms.service';
import { Router } from '@angular/router';
import { Variables } from '../../enum/Variables';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  private endPoint: EndPoint = EndPoint.PERSONA;

  public terminos:Boolean = false;

  jwtHelper = new JwtHelperService();

  persona: Persona = Persona.instance('');

  //Lo creo con formulario reactivo porque es mas facil
  formulario: FormGroup = this.fs.fb.group(
    {
      dpi: [, [Validators.required, Validators.minLength(13)]],
      nombre: [, [Validators.required, Validators.minLength(3)]],
      correo: [],
      usuario: [],
      password: [],
      password2: [],
      codigo_sap: [],
      departamento: [],
    }, {
      validators: this.fs.validarPasswordForm('password','password2')
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

  activarDesactivarTerminos(){
    this.terminos = !this.terminos;
  }

  validarTerminos(){
    //Valido que el formulario sea valido
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.sa.error('', 'DPI incorrecto, debe de tener 13 digitos');
      return;
    }

    this.activarDesactivarTerminos();

  }


  registrarse() {     
    let persona:Persona = Persona.instance(this.persona);    
    persona.tipo = 'U';
    persona.rol_solicitado = 'US';
       
    this.api.registrarse(this.endPoint, persona).subscribe(resp => {      
      if (resp.ok) {
        this.sa.realizado('Bienvenido', '');
        let token: any = resp.data;
        
        localStorage.setItem(Variables.TOKEN_LOCALSTORAGE, token);
        let payload = this.jwtHelper.decodeToken(token);        
        localStorage.setItem(Variables.PAYLOAD, JSON.stringify(payload));
        this.router.navigateByUrl('/principal/inicio');
      } else {
        this.sa.error('Error', JSON.stringify(resp.error))
      }
    })
  }

}
