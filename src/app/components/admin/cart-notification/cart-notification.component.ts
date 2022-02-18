import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart-notification',
  templateUrl: './cart-notification.component.html',
  styleUrls: ['./cart-notification.component.scss']
})
export class CartNotificationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
