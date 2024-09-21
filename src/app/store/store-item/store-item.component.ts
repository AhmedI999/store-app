import {
  Component, computed,
  ElementRef,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  Signal,
  signal,
  SimpleChanges
} from '@angular/core';
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
export class StoreItemComponent implements OnInit {
  storeService = inject(StoreService);
  details = input.required<ItemDetails>();
  quantity = signal<number>(0);

  ngOnInit(): void {
    // Get quantity from service
    this.quantity.set(this.storeService.getItemQuantity(this.details().title));
    this.storeService.initCartTotalItems();
  }

  onPlusClicked() {
    this.storeService.updateItemQuantity(this.details(), true);
    this.quantity.set(this.storeService.getItemQuantity(this.details().title));
  }

  onMinusClicked() {
    this.storeService.updateItemQuantity(this.details(), false);
    this.quantity.set(this.storeService.getItemQuantity(this.details().title));
  }
}
