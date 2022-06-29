import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepeatService {
  quantity(callback: Function,quantity: number) {
    if (!quantity) {
      return;
    }
    callback();
    this.quantity(callback, quantity - 1);
  }
}
