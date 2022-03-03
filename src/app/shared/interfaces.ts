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
  place: Theatre,
  start: Date,
  posterSrc?: string,
}

export interface Theatre {
  name: string,
  country: string,
  town: string,
  address: string
}

export interface Seat {
  row: number,
  seatNumber: number,
  auditoriumSection?: string
}

