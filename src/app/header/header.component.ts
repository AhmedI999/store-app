import {Component, computed, inject, output, signal} from '@angular/core';
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
export class HeaderComponent {
  storeService = inject(StoreService);

  constructor(private dialog: MatDialog) {}

  onCartClicked() {
    const userItems = this.storeService.getCartItems();
    this.dialog.open(CartModalComponent, {
      data: userItems,
    });
  }
}
