import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Utilizador} from '../utilizador'
import {UtilizadorService} from '../utilizador.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  utilizadores: Utilizador[] = [];

  registerForm = new FormGroup({
    userId: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    pass: new FormControl(''),
    cpass: new FormControl('')
  });
  constructor(private _router:Router, private utilizadorService: UtilizadorService) { }
  moveToLogin() {
    this._router.navigate(['/login']);
  }

  register() {
    const userId = this.registerForm.value.userId;
    const pass = this.registerForm.value.pass;
    const cpass = this.registerForm.value.cpass;
    console.log(`Username: ${userId}, Password: ${pass}, Password: ${cpass}`);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if(!this.registerForm.valid){
      alert('O nome de utilizador só pode ter caracteres alfanuméricos e deve ter três caracteres no mínimo');

      return;
    }
    if(!passwordRegex.test(<string>pass)){
      alert("'A senha deve ter oito ou mais caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um algarismo");
      return;
    }
    if((this.registerForm.controls.pass.value != this.registerForm.controls.cpass.value)){
      alert("As passwords nao sao iguais");
      return;
    }

    this.utilizadorService.addUtilizador({userId, pass} as Utilizador)
      .subscribe(utilizador => {
        this.utilizadores.push(utilizador);
      });

  }
}
