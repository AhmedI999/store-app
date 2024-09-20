import {Injectable, Signal, WritableSignal} from "@angular/core";
import {ItemDetails, UserDetails} from "./app/ItemDetails.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  storeItems: ItemDetails[] = [
    {
      imagePath: "images/img-1.jpg",
      imageAlt: "A shirt",
      title: "Casual Shirt",
      quantity: 0,
      price: 45,
    },
    {
      imagePath: "images/img-2.jpg",
      imageAlt: "Office Shirt",
      title: "Office Shirt",
      quantity: 0,
      price: 100,
    },
    {
      imagePath: "images/img-3.jpg",
      imageAlt: "A Shirt",
      title: "T Shirt",
      quantity: 0,
      price: 25,
    },{
      imagePath: "images/img-4.jpg",
      imageAlt: "A Suit",
      title: "Mens Suit",
      quantity: 0,
      price: 300,
    },
  ];
  cartItems: ItemDetails[] = [];

  private getUserDetails(): UserDetails {
    const user = localStorage.getItem('user')!;
    return user ? JSON.parse(user) : {id: Math.random(), basket: []};
  }

  private updateUserDetails(user: UserDetails) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private updateDomQuantity(quantity: WritableSignal<number>, isAdding: boolean): void {
    // Update the quantity in the DOM
    // Math.max ensures that the value never go below zero
    quantity.update((number: number) => isAdding ? number + 1 : Math.max(0, number - 1))
  }

  private updateBasket(user: UserDetails, item: ItemDetails, isAdding: boolean): void {
    // Separate method for updating the basket
    const existingItem = user.basket.find(userItem => userItem.title === item.title);
    if (existingItem) {
      this.modifyExistingItem(existingItem, isAdding);

      // Remove the item if the quantity drops to 0
      if (existingItem.quantity === 0) {
        this.removeItemFromBasket(user, item.title);
      }
    } else if (isAdding) {
      this.addItemToBasket(user, item);
    }
  }

  private modifyExistingItem(existingItem: ItemDetails, isAdding: boolean): void {
    // Method for modifying an existing item in the basket
    existingItem.quantity = isAdding
      ? existingItem.quantity + 1
      : Math.max(0, existingItem.quantity - 1);
  }

  private removeItemFromBasket(user: UserDetails, itemTitle: string): void {
    // Method for removing an item from the basket
    user.basket = user.basket.filter(userItem => userItem.title !== itemTitle);
  }

  private addItemToBasket(user: UserDetails, item: ItemDetails): void {
    // Method for adding a new item to the basket
    user.basket.push({
      imagePath: item.imagePath,
      imageAlt: item.imageAlt,
      title: item.title,
      price: item.price,
      quantity: 1, // Set initial quantity to 1 for new items
    });
  }

  initItemQuantity(quantitySignal: WritableSignal<number>, quantity: number) {
    quantitySignal.set(quantity);
  }

  getUserItems() {
    const userData = localStorage.getItem('user');
    if (!userData) return;
    const user = JSON.parse(userData);
    return user.basket;
  }

  updateItem(quantity: WritableSignal<number>, item: ItemDetails, isAdding: boolean) {
    // Update the quantity in the DOM
    this.updateDomQuantity(quantity, isAdding);

    // Get user details from localStorage or another source
    const user = this.getUserDetails();

    // Update the item in the user's basket
    this.updateBasket(user, item, isAdding);

    // Update the basket in localStorage
    this.updateUserDetails(user);
  }





}
/*  updateItem(quantity: WritableSignal<number>, item: ItemDetails, isAdding: boolean) {

    quantity.update((number: number) => isAdding ? number + 1 : Math.max(0, number - 1));

    // Get user details from localStorage or another source
    const user = this.getUserDetails();

    // Find the item in the user's basket if it exists
    const existingItem = user.basket.find(userItem => userItem.title === item.title);

    if (existingItem) {
      // Update the quantity if the item exists in the basket
      existingItem.quantity = isAdding
        ? existingItem.quantity + 1
        : Math.max(0, existingItem.quantity - 1);

      // Remove the item if the quantity drops to 0
      if (existingItem.quantity === 0) {
        user.basket = user.basket.filter(userItem => userItem.title !== item.title);
      }
    } else if (isAdding) {
      // Add new item if it doesn't exist and the operation is adding
      user.basket.push({
        imagePath: item.imagePath,
        imageAlt: item.imageAlt,
        title: item.title,
        price: item.price,
        quantity: 1,
      });
    }

    // Update the basket in localStorage
    this.updateUserDetails(user);
  } */