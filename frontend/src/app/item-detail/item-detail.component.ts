import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item } from '../item';
import { ItemService } from '../item.service';
import {Utilizador} from "../utilizador";
import {UtilizadorService} from "../utilizador.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
    selector: 'item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: [ './item-detail.component.css' ]
})

export class ItemDetailComponent implements OnInit {
    item: Item | undefined;
    utilizador: Utilizador | undefined;
    ratingCounts = [0, 0, 0, 0, 0];
    currentImageIndex: number = 0;
    constructor(
      private route: ActivatedRoute,
      private ItemService: ItemService,
      private location: Location,
      private utilizadorService: UtilizadorService,
    ) {}

    async ngOnInit(): Promise<void> {
        await this.get_item();
        this.getUtilizador();
        // this.get_count();
    }


    get_count(){
        this.ratingCounts = [0, 0, 0, 0, 0];
        if (this.item !== undefined) {
            for (let l = 0; l < 5; l++) {
                let counter = 0;
                // console.log("-------------------------------------------------------------------");
                for (let i = 0; i < this.item.avaliacoes.length; i++) {
                    // console.log(this.item.avaliacoes[i]);
                    if (this.item.avaliacoes[i] === l+1){
                        counter++;
                    }
                }
                // console.log(this.ratingCounts);
                (this.ratingCounts)[l] = counter;
            }

        }
    }

    get_classificacao_Geral(){
        let soma = 0;
        let numero = 0;
        for (let i = 0; i < this.ratingCounts.length; i++) {
            soma += (i+1) * this.ratingCounts[i];
            numero += this.ratingCounts[i];
        }
        let media = soma/numero;
        return media.toFixed(2);
    }




    get_item(): void {
      const id = this.route.snapshot.paramMap.get('itemid')!;
      this.ItemService.get_item(id.toString())
        .subscribe(item => this.item = item);
    }

    goBack(): void {
      this.location.back();
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
    addCarrinho( item: Item) {
      this.utilizadorService.addCarrinho(this.utilizador as Utilizador, item as Item)
        .subscribe();
    }

    previousImage() {
        // @ts-ignore
        this.currentImageIndex = (this.currentImageIndex - 1 + this.item?.imagensIlustrativas.length) % this.item?.imagensIlustrativas.length;
    }

    nextImage() {
        // @ts-ignore
        this.currentImageIndex = (this.currentImageIndex + 1) % this.item?.imagensIlustrativas.length
    }

    addWhishlist( item: Item) {
        this.utilizadorService.addItemWishlist(this.utilizador as Utilizador, item as Item)
            .subscribe();
    }
}

