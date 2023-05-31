import { Component, OnInit } from '@angular/core';
import {Utilizador} from "../utilizador";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { UtilizadorService } from '../utilizador.service';
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-prof-sets',
  templateUrl: './prof-sets.component.html',
  styleUrls: ['./prof-sets.component.css']
})
export class ProfSetsComponent implements OnInit{
  utilizador: Utilizador | undefined;
  registerForm = new FormGroup({
  userId: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
  pass: new FormControl(''),
  imagem: new FormControl('')})
  constructor(
    private route: ActivatedRoute,
    private utilizadorService: UtilizadorService,
  ) {}

  ngOnInit(): void {
    this.getUtilizador();
  }

  getUtilizador(): void {
    // @ts-ignore
    const id = this.route.parent.snapshot.paramMap.get('id');
    // @ts-ignore
    this.utilizadorService.getUtilizador(id.toString()).pipe(catchError(error => {
        console.log('Error fetching user data', error);
        return of(null);
      })
    )
      .subscribe(utilizador => {
        // @ts-ignore
        this.utilizador = utilizador;
        console.log(this.utilizador?.userId);
      });

  }

  updateUser(): void{
    const userId = this.registerForm.value.userId;
    const pass = this.registerForm.value.pass;
    const imagemDePerfil = this.registerForm.value.imagem;
    console.log(`Username: ${userId}, Password: ${pass}, ${imagemDePerfil}`);
    if(userId != ''){
      if(!this.registerForm.valid){
        alert('O nome de utilizador só pode ter caracteres alfanuméricos e deve ter três caracteres no mínimo');
        return;
      }
    }
    if(pass != ''){
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if(!passwordRegex.test(<string>pass)){
        alert('A senha deve ter oito ou mais caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um algarismo');
        return;
      }
    }

    // @ts-ignore
    this.utilizadorService.updateUser(this.utilizador, userId, pass, imagemDePerfil).subscribe(
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
