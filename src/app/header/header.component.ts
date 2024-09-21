import {Component, inject, output, WritableSignal,} from '@angular/core';
import {StoreService} from "../../store.service";
import {MatDialog} from "@angular/material/dialog";
import {CartModalComponent} from "./cart-modal/cart-modal.component";
import {ItemDetails} from "../ItemDetails.model";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  storeService = inject(StoreService);
  totalItems = this.storeService.totalItems;
  cartItems = this.storeService.cartItems;

  constructor(private dialog: MatDialog) {}

  onCartClicked() {
    const previousQuantity = this.storeService.cartItems().reduce((sum, basketItem) => sum + basketItem.quantity, 0);

    const dialogRef = this.dialog.open(CartModalComponent, {
      data: this.cartItems,
      width: '80%'
    });

    dialogRef.afterClosed().subscribe( (cartItems: WritableSignal<ItemDetails[]>) => {
      const currentQuantity = cartItems().reduce((sum, basketItem) => sum + basketItem.quantity, 0);
      console.log(previousQuantity, currentQuantity);
      if (previousQuantity != currentQuantity) window.location.reload();
    });
  }


}
