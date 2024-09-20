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

  constructor() {
    this.loadUserDetails();
  }

  // Save user details in localStorage
  private updateUserDetails() {
    const userDetails = {
      storeItems: this.storeItems,
      cartItems: this.cartItems,
    };
    localStorage.setItem("user", JSON.stringify(userDetails));
  }

  // Load user details from localStorage when the app starts
  private loadUserDetails() {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userDetails = JSON.parse(userData);
      this.storeItems = userDetails.storeItems || this.storeItems;
      this.cartItems = userDetails.cartItems || this.cartItems;
    }
  }

  // Get cart items for display in the cart modal
  getCartItems(): ItemDetails[] {
    return this.cartItems.slice();
  }

  // Get store items for display
  getStoreItems(): ItemDetails[] {
    return this.storeItems.slice();
  }

  // Add item to cart and update the cartItems array
  addToCart(item: ItemDetails): void {
    const existingCartItem = this.cartItems.find(cartItem => cartItem.title === item.title);
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    this.updateUserDetails();
  }

  // Remove item from cart and update the cartItems array
  removeFromCart(item: ItemDetails): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.title === item.title);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    this.updateUserDetails();
  }

  // Update quantity in the cart for an existing item
  updateCartItemQuantity(item: ItemDetails, isAdding: boolean): void {
    const existingCartItem = this.cartItems.find(cartItem => cartItem.title === item.title);
    if (existingCartItem) {
      existingCartItem.quantity = isAdding
        ? existingCartItem.quantity + 1
        : Math.max(0, existingCartItem.quantity - 1);

      if (existingCartItem.quantity === 0) {
        this.removeFromCart(item);
      }
    }
    this.updateUserDetails();
  }

  // Update the quantity displayed in the store
  updateDomQuantity(quantity: WritableSignal<number>, isAdding: boolean): void {
    quantity.update(number => (isAdding ? number + 1 : Math.max(0, number - 1)));

  }

  // Initialize store item quantity to sync with cart
  initItemQuantity(quantitySignal: WritableSignal<number>, quantity: number): void {
    quantitySignal.set(quantity);
  }

  // Update both store and cart when an item is added/removed in the UI
  updateItem(quantity: WritableSignal<number>, item: ItemDetails, isAdding: boolean) {
    // Update the quantity in the DOM (UI)
    this.updateDomQuantity(quantity, isAdding);

    // Update the `storeItems` array
    this.updateStoreItem(item.title, isAdding);

    // Update the quantity in the cart
    this.updateCartItemQuantity(item, isAdding);
  }

  private updateStoreItem(title: string, isAdding: boolean) {
    const storeItem = this.storeItems.find((item) => item.title === title);
    if (storeItem) {
      storeItem.quantity = isAdding
        ? storeItem.quantity + 1
        : Math.max(0, storeItem.quantity - 1);
    }
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
