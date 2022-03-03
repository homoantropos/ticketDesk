import {TicketStatus} from "./enums";

export interface User {
  email: string,
  password: string,
  actualPassword?: string,
  birthday?: Date,
  surname?: string,
  name?: string,
  phoneNumber?: string,
  role?: string,
  profilePictureSrc?: string,
  status?: string,
  confirmationCode?: string,
  id?: number
}

export interface Performance {
  name: string,
  description: string,
  place: string,
  start: Date,
  posterSrc?: string,
}

export interface Seat {
  row: number,
  seatNumber: number
}

export interface Cart {

}
