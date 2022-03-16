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
  description?: string,
  place: Venue,
  start: Date,
  posterSrc?: string,
  promoter?: User,
  phones?: Array<string>,
  email?: string,
  web?: string,
  id?: number
}

export interface Venue {
  name: string,
  address: string,
  phones?: Array<string>,
  email?: string,
  webSite?: string,
  seats?: Array<Seat>,
  id?: number
}

export interface Seat {
  venue: Venue,
  venueHall?: string,
  hallSection?: string,
  row?: number,
  seatNumber?: number,
  typeOfSeat?: string,
  id?: number
}

export interface AuditoriumSection {
  // name?: string,
  sectionName: string,
  id?: number
}
