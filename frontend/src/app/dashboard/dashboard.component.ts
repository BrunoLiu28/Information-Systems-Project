import { Component, OnInit } from '@angular/core';
import { Utilizador } from '../utilizador';
import { ActivatedRoute } from '@angular/router';
import { UtilizadorService } from '../utilizador.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {Lista} from "../lista";
// @ts-ignore
import console = require("console");

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  utilizador: Utilizador | undefined;
  listas: Lista[] = [];

  constructor(
    private route: ActivatedRoute,
    private utilizadorService: UtilizadorService
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

  getListaByid(lista: Lista): Lista | null {
    if (!this.utilizador) return null;
    const foundLista = this.utilizador.listas.find(p => p._id.toString() === lista._id.toString());

    return foundLista || null;
  }

  protected readonly console = console;
}
