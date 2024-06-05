import { Component, OnInit } from '@angular/core';
import { EndPoint } from '../../enum/EndPoint.enum';
import { Persona } from '../../model/Persona';
import { FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { SwaService } from '../../services/swa.service';
import { FormsService } from '../../services/forms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {

 
  private endPoint: EndPoint = EndPoint.PERSONA;

  persona: Persona = Persona.instance('');

  //Lo creo con formulario reactivo porque es mas facil
  formulario: FormGroup = this.fs.fb.group(
    {
      codigo_password: [, [Validators.required, Validators.minLength(2)]],
      password: [],
      password2: []
    }, {
      validators: this.fs.validarPasswordForm('password','password2')
    } );

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

  guardar() {  
    //Valido que el formulario sea valido
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.sa.error('', 'Formulario invalido');
      return;
    }
  
    let persona:Persona = Persona.instance(this.persona);

    let data = {
      codigo: persona.codigo_password,
      password: persona.password
    }

  
    this.api.post(this.endPoint+"/cambiarclave", data).subscribe(resp => {
      if (resp.ok) {
        this.sa.realizado('Clave restablecida correctamente', '');
        this.router.navigateByUrl('/login');
      } else {
        this.sa.error('Error', resp.error)
      }
    })
    
  }

}
