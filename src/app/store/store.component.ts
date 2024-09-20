import { Component } from '@angular/core';
import {CartModalComponent} from "../header/cart-modal/cart-modal.component";

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    CartModalComponent
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
  host: {
    class: 'container'
  }
})
export class StoreComponent {

}
