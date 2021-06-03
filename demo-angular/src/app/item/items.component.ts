import { Component, OnInit } from '@angular/core'

import * as Toast from 'nativescript-toast';

import { Item } from './item'
import { ItemService } from './item.service'

@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
  items: Array<Item>
  counter: number = 16;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems()
  }

  message(): void {
    let msg: string;
    if (this.counter > 0) {
        msg = this.counter + ' taps left';
    } else {
        msg = 'Hoorraaay! \nYou are ready to start building!';
    }
    Toast.makeText(msg).show();
}

public onTap() {
    this.counter--;
    this.message();
}
}
