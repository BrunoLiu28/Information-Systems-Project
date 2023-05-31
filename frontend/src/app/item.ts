import { ObjectId } from 'bson';
// @ts-ignore
import type { Buffer } from 'node';

export interface Item {
  _id: ObjectId;
  nome: string;
  tipo: string;
  descricao: string;
  plataforma:string;
  idiomas: [string];
  preco: Number;
  classificacao_Geral: Number;
  // avaliacoes: Number;
  avaliacoes: number[];
  imagemPrincipal: string;
  imagensIlustrativas: [ string];
}
