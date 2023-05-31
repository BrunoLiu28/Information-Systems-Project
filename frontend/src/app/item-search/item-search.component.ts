import {Component, OnInit} from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchText: string = '';

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.filteredItems = items; // Initialize filteredItems to items
    });
  }

  filterItems(): void {
    this.filteredItems = this.items.filter(item =>
      item.nome.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
