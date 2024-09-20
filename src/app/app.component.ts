import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {StoreItemComponent} from "./store/store-item/store-item.component";
import {StoreComponent} from "./store/store.component";
import {StoreService} from "../store.service";
import {ItemDetails} from "./ItemDetails.model";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, StoreItemComponent, StoreComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  storeService = inject(StoreService);
  storeItems = signal<ItemDetails[]>(this.storeService.getStoreItems());

}
