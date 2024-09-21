import {Component, inject, Inject, OnDestroy, WritableSignal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ItemDetails} from "../../ItemDetails.model";
import {MatButton} from "@angular/material/button";
import {StoreItemComponent} from "../../store/store-item/store-item.component";
import {StoreService} from "../../../store.service";

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    StoreItemComponent
  ],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent implements OnDestroy{
  data: WritableSignal<ItemDetails[]> = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<CartModalComponent>);
  storeService = inject(StoreService);
  totalPrice = this.storeService.totalPrice;

  ngOnDestroy(): void {
    this.dialogRef.close(this.data);
  }


  onClearCart() {
    this.storeService.resetUserItems();
  }

}
