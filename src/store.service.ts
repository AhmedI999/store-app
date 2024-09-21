import {Injectable, signal, Signal, WritableSignal} from "@angular/core";
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
    }, {
      imagePath: "images/img-4.jpg",
      imageAlt: "A Suit",
      title: "Mens Suit",
      quantity: 0,
      price: 300,
    },
    {
      imagePath: "images/img-5.png",
      imageAlt: "A Tie",
      title: "Mens Tie",
      quantity: 0,
      price: 25,
    },
    {
      imagePath: "images/img-6.png",
      imageAlt: "shoes",
      title: "Casual shoes",
      quantity: 0,
      price: 200,
    },
    {
      imagePath: "images/img-7.png",
      imageAlt: "A Suit",
      title: "black suit",
      quantity: 0,
      price: 450,
    },
    {
      imagePath: "images/img-8.png",
      imageAlt: "A shirt",
      title: "polo shirt",
      quantity: 0,
      price: 45,
    },
    {
      imagePath: "images/img-9.png",
      imageAlt: "A shirt",
      title: "denim shirt",
      quantity: 0,
      price: 85,
    },
    {
      imagePath: "images/img-10.png",
      imageAlt: "Pants",
      title: "denim pants",
      quantity: 0,
      price: 120,
    },
    {
      imagePath: "images/img-11.png",
      imageAlt: "Cap",
      title: "basic cap",
      quantity: 0,
      price: 35,
    },
    {
      imagePath: "images/img-12.png",
      imageAlt: "leather boots",
      title: "leather boots",
      quantity: 0,
      price: 350,
    },


  ];
  cartItems = signal<ItemDetails[]>([]);
  totalItems = signal<number>(0);
  totalPrice = signal<number>(0);

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

  initCartTotalItems() {
    const userItems: ItemDetails[] = this.userItems || [];
    const totalItemsInCart = userItems.reduce((sum, basketItem) => sum + basketItem.quantity, 0);
    const totalPriceInCart = userItems.reduce((sum, basketItem) => sum + (basketItem.price * basketItem.quantity), 0);
    this.totalItems.set(totalItemsInCart);
    this.totalPrice.set(totalPriceInCart);
    this.cartItems.set(userItems);
  }

  get userItems() {
    const userData = localStorage.getItem('user');
    if (!userData) return;
    const user = JSON.parse(userData);
    return user.basket;
  }

  getItemQuantity(title: string): number {
    const userItems: ItemDetails[] = this.userItems || [];
    const item = userItems.find(userItem => userItem.title === title);
    return item ? item.quantity : 0;
  }
  updateItemQuantity(item: ItemDetails, isAdding: boolean): void {
    const user = this.getUserDetails();
    this.updateBasket(user, item, isAdding);
    this.updateUserDetails(user);
    this.cartItems.set(user.basket);

    const totalItemsInCart = user.basket.reduce((sum, basketItem) => sum + basketItem.quantity, 0);
    const totalPriceInCart = user.basket.reduce((sum, basketItem) => sum + (basketItem.price * basketItem.quantity), 0);

    this.totalItems.set(totalItemsInCart);
    this.totalPrice.set(totalPriceInCart);
  }

  resetUserItems() {
    // handle reset in local storage
    const user = this.getUserDetails();
    user.basket = [];
    this.updateUserDetails(user);
    // handle cart reset
    this.cartItems.set([]);
    this.totalItems.set(0);
    this.totalPrice.set(0);
  }
}
