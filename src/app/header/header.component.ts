import {Component, inject,} from '@angular/core';
import {StoreService} from "../../store.service";
import {MatDialog} from "@angular/material/dialog";
import {CartModalComponent} from "./cart-modal/cart-modal.component";

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
    const dialogRef = this.dialog.open(CartModalComponent, {
      data: this.cartItems,
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(() => {

    });
  }


}
