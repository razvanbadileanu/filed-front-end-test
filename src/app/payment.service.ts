import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Payment } from './payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  paymentUrl = 'https://filed-front-end-test.firebaseio.com/payments.json';

  constructor(private http: HttpClient) { }

  savePayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.paymentUrl, payment)
      .pipe(
        retry(1),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }
}
