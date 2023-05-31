import { ObjectId } from 'bson';
import { Item } from "./item";
import {Lista} from "./lista";
export interface Utilizador {
  _id: ObjectId;
  userId: string;
  pass: string;
  listas: [Lista];
  bibliotecaItems: [Item];
  listaSegue: [Utilizador];
  listaSeguidores: [Utilizador];
  carrinho: [Item];
  imagemDePerfil: string;
  wishlist: [Item];
}
