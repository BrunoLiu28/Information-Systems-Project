import { ObjectId } from 'bson';
// @ts-ignore
import type { Buffer } from 'node';
import {Item} from "./item";

export interface Lista {
  _id: ObjectId;
  nome: string;
  objetos: Item[];
}


