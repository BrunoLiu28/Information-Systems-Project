import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Utilizador} from "../utilizador";
import {UtilizadorService} from '../utilizador.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  utilizadores: Utilizador[] = [];

  registerForm = new FormGroup({
    userId: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    pass: new FormControl('')
  });

  constructor(private _router:Router, private utilizadorService: UtilizadorService) { }
  moveToRegister() {
    this._router.navigate(['/register']);
  }

  login() {
    const userId = this.registerForm.value.userId;
    const pass = this.registerForm.value.pass;
    console.log(`Username: ${userId}, Password: ${pass}`);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if(!this.registerForm.valid){
      alert('O nome de utilizador só pode ter caracteres alfanuméricos e deve ter três caracteres no mínimo');
      return;
    }
    if(!passwordRegex.test(<string>pass)){
      alert('A senha deve ter oito ou mais caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um algarismo');
      return;
    }

    this.utilizadorService.loginUtilizador({userId, pass} as Utilizador).subscribe(
      (response) => {
        console.log(response);
        // Do something with response, e.g. redirect to main page
      },
      (error) => {
        console.log(error);

      }
    );
  }


}
