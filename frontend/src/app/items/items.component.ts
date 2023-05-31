import {Component, OnInit} from '@angular/core';

import { Item } from '../item';
import { ItemService } from '../item.service';
import {Utilizador} from "../utilizador";
import { UtilizadorService } from '../utilizador.service';
import {ActivatedRoute} from "@angular/router";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  utilizador: Utilizador | undefined;
  items: Item[] = [];

  constructor(private itemService: ItemService,private route: ActivatedRoute,
              private utilizadorService: UtilizadorService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.getUtilizador();
  }

  getHeroes(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items);
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



  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.addHero({ name } as Hero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //     });
  // }
  //
  // delete(hero: Hero): void {
  //   this.heroes = this.heroes.filter(h => h !== hero);
  //   this.heroService.deleteHero(`${hero._id.toString()}`).subscribe();
  // }

  add(item: Item) {

  }
}
