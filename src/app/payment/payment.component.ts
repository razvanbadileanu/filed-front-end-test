import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PaymentService } from 'src/app/payment.service';
import { Subscription } from 'rxjs';

import { validate } from "class-validator";
import { Payment } from '../payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  @Output() messageEvent = new EventEmitter<string>();

  private subscription: Subscription;

  data = new Payment();

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
  }

  getData() {
    this.data.amount = 0.1;
    this.data.cardholder = 'Mario';
    this.data.creditCardNumber = '0000 0000 0000 0000';
    this.data.expirationDate = new Date();
    this.data.securityCode = 229;
  }

  onSavePayment() {

    this.getData();

    validate(this.data).then(errors => { // errors is an array of validation errors
      if (errors.length > 0) {
        console.log("validation failed. errors: ", errors);
      } else {
        console.log("validation succeed");
      }
    });

    this.subscription = this.paymentService.savePayment(this.data).subscribe(response => {
      console.log(response);
      console.log(this.data);
    }),
      (err) => console.log(err);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
