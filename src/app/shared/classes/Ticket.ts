import {TicketStatus} from "../enums";
import {Performance, Seat, User} from "../interfaces";

export class Ticket {

  private _price = 0;
  private _status = TicketStatus.Free;
  private _discount = 0;
  private _owner?: User;

  constructor(
    public seat: Seat,
    public performance: Performance
  ) {  }

  set status(status: string) {
    switch(status) {
      case('Free') :
        this._status = TicketStatus.Free;
        break;
      case('Booked') :
        this._status = TicketStatus.Booked;
        break;
      case('Sold') :
        this._status = TicketStatus.Sold;
        break;
      case('ReturnAsked') :
        this._status = TicketStatus.ReturnAsked;
        break;
      case('Refunded') :
        this._status = TicketStatus.Refunded;
        break;
    }
  }

  get status() {
    return this._status;
  }

  set owner(owner: User) {
    if (this._status !== 'Free' || 'Refunded')
      return;
    this._status = this._status === 'Free' || 'Refunded' ? TicketStatus.Booked : TicketStatus.Sold
    this._owner = owner;
  }

  get owner() {
    // @ts-ignore
    return this._owner;
  }

  get price() {
    return (this._price - this._price * this.discount);
  }

  get discount() {
    // @ts-ignore
    return this._discount;
  }

  set price(price: number) {
    this._price = price
  }

  set discount(discount: number) {
    this._discount = discount;
  }
}
