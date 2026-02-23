export interface SavedAvailability {
  _id: string;
  user: string;
  match: string;
  slots: AvailabilitySlot[];
  createdAt: string;
  updatedAt: string;
}
export interface AvailabilitySlot {
  date: string;
  from: string;
  to: string;
}
export interface SaveAvailabilityResponse {
  success: boolean;
  availability: SavedAvailability;
}
export type FirstCommonSlotResponse =
  | {
      found: false;
      message?: string;
    }
  | {
      found: true;
      date: string;
      from: string;
      to: string;
    };

export interface Partner {
  _id: string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  bio?: string;
}

export interface MyAvailabilityResponse {
  _id: string;
  match: string;
  partner: Partner | null;
  slots: AvailabilitySlot[];
  createdAt: string;
  updatedAt: string;
}
export type GetAllAvailabilityOfMeResponse = MyAvailabilityResponse[];