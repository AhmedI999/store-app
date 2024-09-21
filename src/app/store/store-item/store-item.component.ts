import {Component, ElementRef, inject, input, OnInit, output, signal} from '@angular/core';
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
  details = input.required<ItemDetails>();
  quantity = signal<number>(0);

  ngOnInit(): void {
    const userItems: ItemDetails[] = this.storeService.userItems;

    if (userItems) {
      const item = userItems.find(
        (userItem) => userItem.title === this.details().title
      );
      if (item) {
        this.storeService.initItemQuantity(this.quantity, item.quantity);

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
