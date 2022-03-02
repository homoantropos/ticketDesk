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
  start: Date,
  posterSrc: string,
}

export interface Sit {

}

export interface Ticket {

}

export interface Cart {

}
