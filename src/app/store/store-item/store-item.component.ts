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
  details = input.required<ItemDetails>();
  storeService = inject(StoreService);
  quantity = signal<number>(0);

  ngOnInit(): void {
    const userItems: ItemDetails[] = this.storeService.getUserItems();
    if (userItems) {
      for (const storeItem of userItems) {
        this.storeService.initItemQuantity(this.quantity, storeItem.quantity);
      }
    }
  }

  onPlusClicked() {
    this.storeService.updateItem(this.quantity, this.details(), true);
  }

  onMinusClicked() {
    this.storeService.updateItem(this.quantity, this.details(), false);
  }
}
