import {Component, ElementRef, inject, input, OnInit, signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ItemDetails} from "../../ItemDetails.model";
import {StoreService} from "../../../store.service";

@Component({
  selector: 'app-store-item',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './store-item.component.html',
  styleUrl: './store-item.component.css',
  host: {
    class: 'card'
  }
})
export class StoreItemComponent implements OnInit{
  storeService = inject(StoreService);
  quantity = signal<number>(0);
  item = input.required<ItemDetails>();
  storeItems = signal<ItemDetails[]>(this.storeService.getStoreItems());

  ngOnInit(): void {
    if (this.storeItems()) {
      for (const storeItem of this.storeItems()) {
        console.log(storeItem);
        this.storeService.initItemQuantity(this.quantity, storeItem.quantity);
      }
    }
  }

  onPlusClicked() {
    this.storeService.updateItem(this.quantity, this.item(), true);
  }

  onMinusClicked() {
    this.storeService.updateItem(this.quantity, this.item(), false);
  }
}
