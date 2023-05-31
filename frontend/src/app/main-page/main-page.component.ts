import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Utilizador} from "../utilizador";
import { UtilizadorService } from '../utilizador.service';
import {catchError} from "rxjs/operators";
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  utilizador: Utilizador | undefined;

  constructor(
    private route: ActivatedRoute,
    private utilizadorService: UtilizadorService,
  ) {}

  ngOnInit(): void {
    this.getUtilizador();
  }

  getUtilizador(): void {
    const id = (this.route.snapshot.paramMap.get('id')!);
    console.log(id);
    // @ts-ignore
    this.utilizadorService.getUtilizador(id.toString()).pipe(catchError(error => {
        console.log('Error fetching user data', error);
        return null;
      })
    )
      .subscribe(utilizador => {
        // @ts-ignore
        this.utilizador = utilizador;
        console.log(this.utilizador?.userId);
      });
  }

}
