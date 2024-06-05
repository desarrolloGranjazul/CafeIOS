import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { EndPoint } from '../../enum/EndPoint.enum';
import { Persona } from '../../model/Persona';
import { FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { FormsService } from '../../services/forms.service';
import { Router } from '@angular/router';
import { SwaService } from '../../services/swa.service';
import { Variables } from '../../enum/Variables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  logo:string = "Granjazul.png";

  jwtHelper = new JwtHelperService();
 
  private endPoint: EndPoint = EndPoint.PERSONA;

  persona: Persona = Persona.instance('');

  //Lo creo con formulario reactivo porque es mas facil
  formulario: FormGroup = this.fs.fb.group(
    {
      usuario: [, Validators.required ],
      password: [, Validators.required]
    });

  constructor(private api: ApiService, private sa: SwaService, public fs: FormsService, private router: Router) { }

  ngOnInit(): void {

    this.iniciarFormulario();
    
    //Me subscribo al formulario para que el objeto siempre este actualizado
    this.formulario.valueChanges.subscribe(datos => {
      this.persona = datos;
    })
    this.inicioAutomatico();
  }

  iniciarFormulario() {
    //Le establesco al servicio que estoy trabajando con este formulario
    this.fs.setFomulario(this.formulario);
    //Le paso los datos del objeto al formulario
    this.formulario.reset(this.persona);

  }

  inicioAutomatico (){
    if(this.api.isLogin){
      this.router.navigateByUrl('/principal/inicio');
    }
  }

  guardar() {    

    //Valido que el formulario sea valido
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.sa.error('', 'Formulario invalido');
      return;
    }

   
    this.api.iniciarSesion(this.endPoint, this.persona).subscribe(resp => {
      if (resp.ok) {
        this.sa.realizado('Bienvenido', '');
        let token: any = resp.data;
        localStorage.setItem(Variables.TOKEN_LOCALSTORAGE, token);
        let payload = this.jwtHelper.decodeToken(token);        
        localStorage.setItem(Variables.PAYLOAD, JSON.stringify(payload));
        this.api.recargar = 1;   
        this.router.navigateByUrl('/principal/inicio');
      } else {
        this.sa.error('Error', resp.error)
      }
    });


  }
}
