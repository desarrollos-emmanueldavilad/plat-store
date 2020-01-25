import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { Product } from "./../../../core/models/product.model";
import { CartService } from "./../../../core/services/cart.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"]
})
export class OrderComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private cartService: CartService) {
    this.products$ = this.cartService.cart$;
  }

  loadStripe() {
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  }

  ngOnInit() {
    this.loadStripe();
  }

  pay(amount) {
    var handler = (<any>window).StripeCheckout.configure({
      key: "pk_test_aeUUjYYcx4XNfKVW60pmHTtI",
      locale: "auto",
      token: function(token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        alert("Token Created!!");
      }
    });

    handler.open({
      name: "Tienda Online",
      description: "Completa tu compra",
      amount: amount * 100
    });
  }
}
