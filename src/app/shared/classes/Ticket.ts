import {TicketStatus} from "../enums";
import {Seat, User} from "../interfaces";

export class Ticket {
  constructor(
    public seat: Seat,
    public status: TicketStatus,
    public owner: User,
    private _price: number,
    private _discount: number,
  ) {
  }

  get price() {
    return (this._price - this._price * this.discount);
  }

  get discount() {
    return this._discount;
  }

  set price(price: number) {
    this._price = price
  }

  set discount(discount: number) {
    this._discount = discount;
  }
}
