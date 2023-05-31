import {Component, OnInit} from '@angular/core';
import {Utilizador} from "../utilizador";
import {UtilizadorService} from "../utilizador.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  // @ts-ignore
  utilizador: Utilizador = {};
  itemId: String | undefined;

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

  removerItem(indexToRemove: number): void {
    // // @ts-ignore
    // const id = this.route.parent.snapshot.paramMap.get('id');
    // // @ts-ignore
    // this.utilizadorService.getUtilizador(id.toString()).pipe(catchError(error => {
    //     console.log('Error fetching user data', error);
    //     return of(null);
    //   })
    // )
    //   .subscribe(utilizador => {
    //     // @ts-ignore
    //     this.utilizador = utilizador;
    //     console.log(this.utilizador?.userId);
    //   });


    // const ItemId = this.route.parent.snapshot.paramMap.get('id');
      console.log(this.itemId);
    // @ts-ignore
    this.utilizadorService.removerItemWishlist(this.utilizador, this.utilizador?.wishlist[indexToRemove]).subscribe();
    this.utilizador?.wishlist.splice(indexToRemove, 1);
  }

}



