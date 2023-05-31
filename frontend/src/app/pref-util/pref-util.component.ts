import {Component, OnInit} from '@angular/core';
import {Utilizador} from "../utilizador";
import {ActivatedRoute} from "@angular/router";
import { UtilizadorService } from '../utilizador.service';
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-pref-util',
  templateUrl: './pref-util.component.html',
  styleUrls: ['./pref-util.component.css']
})
export class PrefUtilComponent implements OnInit{
  utilizador: Utilizador | undefined;
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


}
