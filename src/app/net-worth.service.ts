import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetWorthService {
  private netWorth = new Subject<number>();
  private investment = new Subject<number>();

  netWorthOb = this.netWorth.asObservable();
  investmentOb = this.investment.asObservable();

  constructor() {
  }

  emitNetWorth(value: number): void {
    this.netWorth.next(value);
  }

  emitInvestment(value: number): void {
    this.investment.next(value);
  }
}
