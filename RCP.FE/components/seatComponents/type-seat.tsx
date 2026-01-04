export type SeatStatus =
  | 'available'
  | 'selected'
  | 'sold'
  | 'reserved';

export type Seat = {
  id: string;
  label: string;   // F7, I4...
  price: number;
  status: SeatStatus;
};
