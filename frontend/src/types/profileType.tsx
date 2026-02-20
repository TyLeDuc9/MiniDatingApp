export interface Profile {
  _id: string;
  email: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  bio: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface GetAllProfileResponse {
  total: number;
  profiles: Profile[];
}
export interface RegisterProfilePayload {
  email: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  bio: string;
  password: string;
}
export interface ProfileResponse {
  _id: string;
  email: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  bio: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface RegisterResponse {
  message: string;
  user: ProfileResponse;
}

export interface LoginProfilePayload {
  email: string;
  password: string;
}
export interface LoginResponse {
  message: string;
  token: string;
  user: ProfileResponse;
}