import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService  {
  private _formulario: FormGroup | undefined;

  constructor(public fb: FormBuilder) { }

  setFomulario(formulario: FormGroup) {
    this._formulario = formulario;
  }

  validar(campo: string) {
    if (this._formulario) {
      //Si ya esta inicializado el formulario entonces realizao la validaciones
      return this._formulario.controls[campo].errors && this._formulario.controls[campo].touched;
    } else {
      //Si aun no se ha inicializado el formulario devuelve false para que los errores no se muestren en donde utilizen esta funcion
      return false;
    }
  }

  validarPasswordForm(pass1: string, pass2: string) {
    return (formgGroup: FormGroup) => {
      const pass1Control = formgGroup.controls[pass1];
      const pass2Control = formgGroup.controls[pass2];
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ passwordNoCoinciden: true })
      }
    }
  }

}
