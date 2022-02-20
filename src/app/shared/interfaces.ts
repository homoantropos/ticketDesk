export interface User {
  email: string,
  password: string,
  birthday: Date,
  surname?: string,
  name?: string,
  role?: string,
  profilePictureSrc?: string,
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
